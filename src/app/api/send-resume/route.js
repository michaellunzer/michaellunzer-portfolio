import { Resend } from 'resend';
import { loadEmailTemplate } from '../../../utils/emailTemplates.js';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Load email template
    const resumeUrl = process.env.RESUME_URL || 'https://michaellunzer.com/Michael%20Lunzer%20Resume%207-15-24.pdf';
    const emailContent = loadEmailTemplate('resume-request', { RESUME_URL: resumeUrl });

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'michael@michaellunzer.com',
      to: [email],
      subject: 'Michael Lunzer - Resume',
      text: emailContent.text,
      html: emailContent.html,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 