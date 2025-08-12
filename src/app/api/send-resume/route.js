import sgMail from '@sendgrid/mail';

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

    // Email content
    const msg = {
      to: email,
      from: 'michael@michaellunzer.com', // Replace with your verified sender
      subject: 'Michael Lunzer - Resume',
      text: 'Please find my resume at the link below.',
      html: `
        <p>Hi there!</p>
        <p>Thanks for requesting my resume! You can download it using the link below:</p>
        <p><a href="${process.env.RESUME_URL || 'https://michaellunzer.com/Michael%20Lunzer%20Resume%207-15-24.pdf'}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">📄 Download Resume</a></p>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${process.env.RESUME_URL || 'https://michaellunzer.com/Michael%20Lunzer%20Resume%207-15-24.pdf'}</p>
        <p>Best regards,<br>Michael Lunzer</p>
      `,
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