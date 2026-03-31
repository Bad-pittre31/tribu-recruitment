import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TRIBU_NOTIFICATION_EMAIL = Deno.env.get('TRIBU_NOTIFICATION_EMAIL')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { submissionId } = await req.json()
    console.log(`Processing report for submission: ${submissionId}`)

    // 1. Fetch data: CRA + Profile (Candidate) + Mission (Client)
    const { data: submission, error: subError } = await supabaseClient
      .from('cra_submissions')
      .select(`
        *,
        profiles:user_id (email, first_name, last_name),
        missions:mission_id (client_name)
      `)
      .eq('id', submissionId)
      .single()

    if (subError || !submission) {
      console.error('Error fetching submission:', subError)
      throw new Error('CRA Submission not found')
    }

    const profile = submission.profiles
    const mission = submission.missions

    // 2. Format localized month name (French)
    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]
    const monthName = monthNames[submission.month - 1]

    // 3. Prepare variables for Resend Templates
    const emailVariables = {
      full_name: `${profile.first_name} ${profile.last_name}`,
      first_name: profile.first_name,
      month_name: monthName,
      year: submission.year,
      worked_days: submission.worked_days,
      client_name: mission ? mission.client_name : 'TRIBU Mission'
    }

    console.log('Sending emails with variables:', emailVariables)

    // 4. Send Internal Email to TRIBU
    const internalEmail = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'TRIBU – Candidate Portal <noreply@wearetribu.fr>',
        to: [TRIBU_NOTIFICATION_EMAIL],
        subject: `CRA soumis – ${emailVariables.full_name} – ${emailVariables.month_name} ${emailVariables.year}`,
        template_id: 'cra-submitted-internal',
        data: emailVariables
      })
    })

    const internalData = await internalEmail.json()
    if (!internalEmail.ok) throw new Error(`Internal email failed: ${JSON.stringify(internalData)}`)

    // 5. Send Confirmation Email to Candidate
    const candidateEmail = await fetch('https://api.resend.com/emails', {
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

    const candidateData = await candidateEmail.json()
    if (!candidateEmail.ok) throw new Error(`Candidate email failed: ${JSON.stringify(candidateData)}`)

    return new Response(
      JSON.stringify({ success: true, internalId: internalData.id, candidateId: candidateData.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    console.error('Edge Function Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
