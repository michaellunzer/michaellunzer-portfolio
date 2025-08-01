const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const { email } = JSON.parse(event.body);

    // Validate email
    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email address is required' }),
      };
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Email content
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL || 'michaellunzer@gmail.com', // Your verified sender
      subject: 'Michael Lunzer - Resume',
      text: `Hi there,

Thank you for requesting my resume! You can find it attached to this email.

Best regards,
Michael Lunzer
Customer Success Manager at Postman

LinkedIn: https://linkedin.com/in/michaellunzer
Portfolio: https://michaellunzer.com`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Hi there,</h2>
          <p>Thank you for requesting my resume! You can find it attached to this email.</p>
          <p>Best regards,<br>
          <strong>Michael Lunzer</strong><br>
          Customer Success Manager at Postman</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 14px; color: #666;">
            <a href="https://linkedin.com/in/michaellunzer" style="color: #0077b5;">LinkedIn</a> | 
            <a href="https://michaellunzer.com" style="color: #ef5826;">Portfolio</a>
          </p>
        </div>
      `,
      attachments: [
        {
          content: process.env.RESUME_PDF_BASE64, // Base64 encoded PDF
          filename: 'Michael_Lunzer_Resume.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        },
      ],
    };

    // Send the email
    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Resume sent successfully',
        email: email 
      }),
    };

  } catch (error) {
    console.error('Error sending resume:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to send resume. Please try again later.' 
      }),
    };
  }
}; 