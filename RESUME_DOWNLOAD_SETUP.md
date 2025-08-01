# Resume Download System Setup Guide

This guide will help you set up the resume download system using Netlify Functions and SendGrid.

## Prerequisites

1. **SendGrid Account** - Sign up at [sendgrid.com](https://sendgrid.com)
2. **Netlify Account** - Your site should already be deployed on Netlify
3. **PDF Resume** - Your resume in PDF format

## Step 1: SendGrid Setup

### 1.1 Create SendGrid Account
1. Go to [sendgrid.com](https://sendgrid.com) and create an account
2. Verify your email address

### 1.2 Create API Key
1. In SendGrid dashboard, go to **Settings > API Keys**
2. Click **Create API Key**
3. Choose **Full Access** or **Restricted Access** (with Mail Send permissions)
4. Copy the API key (you'll only see it once!)

### 1.3 Verify Sender Email
1. Go to **Settings > Sender Authentication**
2. Click **Verify a Single Sender**
3. Add your email (e.g., `michaellunzer@gmail.com`)
4. Check your email and click the verification link

## Step 2: Prepare Your Resume PDF

### 2.1 Convert PDF to Base64
You need to convert your PDF to base64 format. Here are a few ways:

**Option A: Using Node.js (Recommended)**
```bash
# Create a script to convert your PDF
node -e "
const fs = require('fs');
const pdfPath = './Michael_Lunzer_Resume.pdf'; // Update path to your PDF
const base64 = fs.readFileSync(pdfPath, {encoding: 'base64'});
console.log('RESUME_PDF_BASE64=' + base64);
"
```

**Option B: Online Converter**
1. Go to [base64.guru/converter/encode/pdf](https://base64.guru/converter/encode/pdf)
2. Upload your PDF
3. Copy the base64 string

### 2.2 Test the Conversion
Make sure your base64 string starts with something like `JVBERi0xLjQK...` (PDF files start with this pattern).

## Step 3: Netlify Environment Variables

### 3.1 Set Environment Variables in Netlify
1. Go to your Netlify dashboard
2. Navigate to **Site settings > Environment variables**
3. Add these variables:

```
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=michaellunzer@gmail.com
RESUME_PDF_BASE64=your_base64_pdf_string_here
```

### 3.2 Local Development
Create a `.env.local` file in your project root:
```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=michaellunzer@gmail.com
RESUME_PDF_BASE64=your_base64_pdf_string_here
```

## Step 4: Test the System

### 4.1 Local Testing
1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/resume`
3. Enter your email and test the form
4. Check your email for the PDF

### 4.2 Deploy to Netlify
1. Commit and push your changes
2. Netlify will automatically deploy
3. Test the live version

## Step 5: Customization

### 5.1 Update Email Content
Edit `netlify/functions/send-resume.js` to customize:
- Email subject
- Email body text and HTML
- Your contact information
- Links to your social profiles

### 5.2 Update Resume Preview
Edit `src/components/ResumeDownload.js` to update:
- Your name and title
- Experience highlights
- Skills list

### 5.3 Styling
The CSS is already styled to match your site theme, but you can customize:
- Colors in `src/css/style.css`
- Layout and spacing
- Form validation messages

## Troubleshooting

### Common Issues

1. **"Failed to send resume" error**
   - Check your SendGrid API key
   - Verify your sender email is authenticated
   - Check Netlify function logs

2. **PDF not attaching**
   - Verify the base64 string is correct
   - Check that `RESUME_PDF_BASE64` environment variable is set
   - Ensure the PDF file isn't too large (SendGrid has limits)

3. **Form not submitting**
   - Check browser console for errors
   - Verify the Netlify function path is correct
   - Test the function URL directly

### Debugging

1. **Check Netlify Function Logs**
   - Go to Netlify dashboard > Functions
   - Click on your function to see logs

2. **Test Function Directly**
   ```bash
   curl -X POST https://your-site.netlify.app/.netlify/functions/send-resume \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

3. **Check SendGrid Activity**
   - Go to SendGrid dashboard > Activity
   - See if emails are being sent/delivered

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **Email Validation**: The function validates email format
3. **API Key Security**: Never commit your SendGrid API key to version control
4. **CORS**: The function is configured for your domain only

## Alternative Solutions

If SendGrid doesn't work for you, consider:

1. **Resend** - Modern email API
2. **Mailgun** - Popular email service
3. **AWS SES** - Amazon's email service
4. **Direct PDF Link** - Simple download link (less professional)

## Cost Considerations

- **SendGrid**: Free tier includes 100 emails/day
- **Netlify Functions**: Free tier includes 125,000 function calls/month
- **PDF Storage**: Base64 encoding increases size by ~33%

## Support

If you need help:
1. Check the troubleshooting section above
2. Review SendGrid documentation
3. Check Netlify function logs
4. Test with a simple email first before adding PDF attachment 