import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Note: Using raw fetch for Resend because the SDK on esm.sh can sometimes 
// have issues with Deno's environment if not properly versioned.
// However, we will fetch the template HTML and manually render it.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const TRIBU_NOTIFICATION_EMAIL = Deno.env.get('TRIBU_NOTIFICATION_EMAIL')

const TEMPLATE_INTERNAL_ID = "6ac6fe17-82b2-4fd0-84da-dfedd3161266"
const TEMPLATE_CANDIDATE_ID = "5d29819e-6cfb-48b2-bc1a-086b90ebc129"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper to replace {{{var}}} or {{var}} with actual data
function renderTemplate(html: string, data: Record<string, any>) {
  let rendered = html;
  for (const [key, value] of Object.entries(data)) {
    // Replace {{{key}}} or {{key}}
    const regex = new RegExp(`\\{\\{\\{?${key}\\}\\}\\}?`, 'g');
    rendered = rendered.replace(regex, value?.toString() || '');
  }
  return rendered;
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

    // 1. Fetch Data
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
      throw new Error(`CRA not found: ${subError?.message}`)
    }

    const profile = submission.profiles
    const mission = submission.missions
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
    const monthName = monthNames[submission.month - 1]

    const variables = {
      full_name: `${profile.first_name} ${profile.last_name}`,
      first_name: profile.first_name,
      month_name: monthName,
      year: submission.year,
      worked_days: submission.worked_days,
      client_name: mission ? mission.client_name : 'TRIBU'
    }

    // 2. Fetch Templates from Resend
    const fetchTemplate = async (id: string) => {
      const res = await fetch(`https://api.resend.com/templates/${id}`, {
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}` }
      })
      if (!res.ok) throw new Error(`Failed to fetch template ${id}: ${await res.text()}`)
      return await res.json()
    }

    const [internalTemplate, candidateTemplate] = await Promise.all([
      fetchTemplate(TEMPLATE_INTERNAL_ID),
      fetchTemplate(TEMPLATE_CANDIDATE_ID)
    ])

    // 3. Render HTML
    const internalHtml = renderTemplate(internalTemplate.html, variables)
    const candidateHtml = renderTemplate(candidateTemplate.html, variables)

    // 4. Send Emails via standard Resend API (now with HTML content!)
    const sendEmail = async (to: string[], subject: string, html: string) => {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'TRIBU – Candidate Portal <noreply@wearetribu.fr>',
          to,
          subject,
          html
        })
      })
      if (!res.ok) throw new Error(`Failed to send email: ${await res.text()}`)
      return await res.json()
    }

    await Promise.all([
      sendEmail([TRIBU_NOTIFICATION_EMAIL], `CRA soumis – ${variables.full_name} – ${variables.month_name} ${variables.year}`, internalHtml),
      sendEmail([profile.email], `Confirmation de votre CRA – ${variables.month_name} ${variables.year}`, candidateHtml)
    ])

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Fatal error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
