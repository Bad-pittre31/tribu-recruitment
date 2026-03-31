import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TRIBU_NOTIFICATION_EMAIL = Deno.env.get('TRIBU_NOTIFICATION_EMAIL')

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

    const { submissionId } = await req.json()
    console.log(`Processing CRA submission: ${submissionId}`)

    if (!submissionId) {
      throw new Error('submissionId is required')
    }

    // 1. Fetch data with improved join syntax
    // Testing if 'profiles' or 'profiles:user_id' is needed. 
    // Usually table name is fine if FK is explicit.
    const { data: submission, error: subError } = await supabaseClient
      .from('cra_submissions')
      .select(`
        *,
        profiles (email, first_name, last_name),
        missions (client_name)
      `)
      .eq('id', submissionId)
      .single()

    if (subError) {
      console.error('Supabase query error:', subError)
      return new Response(
        JSON.stringify({ error: 'Supabase query failed', details: subError.message, code: subError.code }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!submission) {
      return new Response(
        JSON.stringify({ error: 'CRA Submission not found in database' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const profile = submission.profiles
    const mission = submission.missions

    if (!profile) {
      return new Response(
        JSON.stringify({ error: 'Candidate profile not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
    const monthName = monthNames[submission.month - 1]

    const emailVariables = {
      full_name: `${profile.first_name} ${profile.last_name}`,
      first_name: profile.first_name,
      month_name: monthName,
      year: submission.year,
      worked_days: submission.worked_days,
      client_name: mission ? mission.client_name : 'TRIBU'
    }

    console.log('Sending emails with variables:', JSON.stringify(emailVariables))

    // 2. Send Internal Email
    const internalRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'TRIBU – Candidate Portal <noreply@wearetribu.fr>',
        to: [TRIBU_NOTIFICATION_EMAIL],
        subject: `CRA soumis – ${emailVariables.full_name} – ${emailVariables.month_name} ${emailVariables.year}`,
        // Mapping for Resend Dashboard Templates
        template_id: 'cra-submitted-internal',
        data: emailVariables
      })
    })

    const internalData = await internalRes.json()
    if (!internalRes.ok) {
      console.error('Resend Internal Error:', internalData)
      return new Response(
        JSON.stringify({ error: 'Failed to send internal email via Resend', details: internalData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // 3. Send Candidate Email
    const candidateRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'TRIBU – Candidate Portal <noreply@wearetribu.fr>',
        to: [profile.email],
        subject: `Confirmation de votre CRA – ${emailVariables.month_name} ${emailVariables.year}`,
        template_id: 'cra-submitted-candidate-fr',
        data: emailVariables
      })
    })

    const candidateData = await candidateRes.json()
    if (!candidateRes.ok) {
      console.error('Resend Candidate Error:', candidateData)
      return new Response(
        JSON.stringify({ error: 'Failed to send candidate email via Resend', details: candidateData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    return new Response(
      JSON.stringify({ success: true, internalId: internalData.id, candidateId: candidateData.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Uncaught Edge Function Error:', error.message)
    return new Response(
      JSON.stringify({ error: 'Unexpected server error', message: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
