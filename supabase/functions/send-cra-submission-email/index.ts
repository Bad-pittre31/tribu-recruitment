import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TRIBU_NOTIFICATION_EMAIL = Deno.env.get('TRIBU_NOTIFICATION_EMAIL')

// Resend Templates UUIDs
const TEMPLATE_INTERNAL_ID = "6ac6fe17-82b2-4fd0-84da-dfedd3161266"
const TEMPLATE_CANDIDATE_ID = "5d29819e-6cfb-48b2-bc1a-086b90ebc129"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const bodyText = await req.text()
    if (!bodyText) {
      return new Response(JSON.stringify({ error: 'Empty body' }), { headers: corsHeaders, status: 400 })
    }

    const payload = JSON.parse(bodyText)
    const { submissionId } = payload

    if (!submissionId) {
      return new Response(JSON.stringify({ error: 'submissionId required' }), { headers: corsHeaders, status: 400 })
    }

    // 1. Fetch data
    const { data: submission, error: subError } = await supabaseClient
      .from('cra_submissions')
      .select(`
        *,
        profiles (email, first_name, last_name),
        missions (client_name)
      `)
      .eq('id', submissionId)
      .single()

    if (subError || !submission) {
      return new Response(JSON.stringify({ error: 'CRA not found', details: subError?.message }), { headers: corsHeaders, status: 400 })
    }

    const profile = submission.profiles
    const mission = submission.missions
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    const monthName = monthNames[submission.month - 1]

    const emailVariables = {
      full_name: `${profile.first_name} ${profile.last_name}`,
      first_name: profile.first_name,
      month_name: monthName,
      year: submission.year,
      worked_days: submission.worked_days,
      client_name: mission ? mission.client_name : 'TRIBU'
    }

    // 2. Send Internal Email
    const internalRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'TRIBU – Candidate Portal <noreply@wearetribu.fr>',
        to: [TRIBU_NOTIFICATION_EMAIL],
        subject: `CRA soumis – ${emailVariables.full_name} – ${emailVariables.month_name} ${emailVariables.year}`,
        template_id: TEMPLATE_INTERNAL_ID,
        data: emailVariables
      })
    })

    // 3. Send Candidate Email
    const candidateRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'TRIBU – Candidate Portal <noreply@wearetribu.fr>',
        to: [profile.email],
        subject: `Confirmation de votre CRA – ${emailVariables.month_name} ${emailVariables.year}`,
        template_id: TEMPLATE_CANDIDATE_ID,
        data: emailVariables
      })
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Fatal error', message: error.message }), { headers: corsHeaders, status: 400 })
  }
})
