# Formspree Setup Guide

## Step 1: Create a Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create a New Form
1. In your Formspree dashboard, click **"+ New Form"**
2. Name your form: **"Contact Form"**
3. Set the recipient email to where you want to receive contact form submissions
4. Click **"Create Form"**

## Step 3: Get Your Form ID
1. After creating the form, you'll see integration options
2. Look for the **React** integration example
3. Copy the **8-character form ID** (e.g., `abcd1234`)
4. It will look something like: `https://formspree.io/f/abcd1234`

## Step 4: Update Your Contact Form
1. Open `src/components/contact.js`
2. Replace `"YOUR_FORM_ID"` with your actual form ID:

```javascript
const [state, handleSubmit] = useForm("abcd1234"); // Replace with your actual form ID
```

## Step 5: Test Your Form
1. Start your development server: `npm run dev`
2. Go to your contact section
3. Fill out and submit the form
4. Check your email for the submission
5. You should see a success message on the page

## Optional: Vercel Integration
If you're using Vercel, you can also:
1. Go to [Formspree Vercel Integration](https://formspree.io/integrations/vercel)
2. Click **"Add Integration"**
3. Connect your Vercel projects
4. Use the environment variable: `process.env.NEXT_PUBLIC_FORM`

## Features Added
- ✅ Form validation with error messages
- ✅ Loading state during submission
- ✅ Success message after submission
- ✅ Styled error messages matching your design
- ✅ Disabled button state during submission

## Troubleshooting
- **Form not submitting**: Check that your form ID is correct
- **No email received**: Check your spam folder and verify the recipient email
- **Validation errors**: Make sure all required fields are filled out
