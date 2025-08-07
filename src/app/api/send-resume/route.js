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
      text: 'Please find my resume attached.',
      html: `
        <p>Hi there!</p>
        <p>Thanks for requesting my resume. Please find it attached to this email.</p>
        <p>Best regards,<br>Michael Lunzer</p>
      `,
      attachments: [
        {
          content: process.env.RESUME_PDF_BASE64,
          filename: 'Michael_Lunzer_Resume.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
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