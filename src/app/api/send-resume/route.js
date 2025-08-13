import sgMail from '@sendgrid/mail';
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

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Load email template
    const resumeUrl = process.env.RESUME_URL || 'https://michaellunzer.com/Michael%20Lunzer%20Resume%207-15-24.pdf';
    const emailContent = loadEmailTemplate('resume-request', { RESUME_URL: resumeUrl });

    // Email content
    const msg = {
      to: email,
      from: 'michael@michaellunzer.com', // Replace with your verified sender
      subject: 'Michael Lunzer - Resume',
      text: emailContent.text,
      html: emailContent.html,
    };

    // Send email
    await sgMail.send(msg);

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