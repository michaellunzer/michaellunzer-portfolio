# Email Templates Guide

## 📧 **Where Are Your Email Templates?**

Your email templates are now stored in separate files for easy customization:

### **📁 Template Files:**
- **HTML Template**: `src/emails/resume-request.html`
- **Text Template**: `src/emails/resume-request.txt`
- **Template Loader**: `src/utils/emailTemplates.js`

## 🎨 **Customizing Your Email Template**

### **1. HTML Template (`resume-request.html`)**
This is the main email template with full styling. You can customize:

- **Colors**: Change the blue theme (`#007bff`) to match your brand
- **Content**: Modify the message text and structure
- **Styling**: Adjust fonts, spacing, and layout
- **Images**: Add your logo or other images

### **2. Text Template (`resume-request.txt`)**
This is the plain text version for email clients that don't support HTML.

### **3. Variables**
The template uses these placeholders that get replaced automatically:
- `{{RESUME_URL}}` - Your resume download link

## 🔧 **How to Customize:**

### **Change Colors:**
```css
/* In resume-request.html, find and change: */
.header h1 { color: #007bff; }  /* Header color */
.download-button { background-color: #007bff; }  /* Button color */
.download-button:hover { background-color: #0056b3; }  /* Button hover */
```

### **Change Content:**
```html
<!-- In resume-request.html, modify: -->
<p>Thanks for requesting my resume! I'm excited to share my background and experience with you.</p>

<!-- Change to: -->
<p>Thanks for your interest in my background! I'm happy to share my resume with you.</p>
```

### **Add Your Logo:**
```html
<!-- Add this in the header section: -->
<div class="header">
    <img src="https://yourdomain.com/logo.png" alt="Your Logo" style="max-height: 60px; margin-bottom: 15px;">
    <h1>📄 Resume Request</h1>
</div>
```

## 📱 **Email Preview:**

Your current template includes:
- **Professional Header**: "📄 Resume Request" title
- **Friendly Greeting**: Personalized message
- **Download Button**: Styled blue button with PDF icon
- **Fallback Link**: Text link for email clients that don't support HTML
- **Your Information**: Name, title, and company
- **Professional Footer**: Context about the email

## 🚀 **Testing Your Template:**

1. **Local Testing**: Run `npm run dev` and test the resume download
2. **SendGrid Testing**: Use SendGrid's email testing tools
3. **Email Client Testing**: Test in Gmail, Outlook, Apple Mail, etc.

## 📋 **Template Features:**

- **Responsive Design**: Works on desktop and mobile
- **Fallback Support**: Graceful degradation for text-only clients
- **Professional Styling**: Clean, modern design
- **Accessibility**: Proper contrast and readable fonts
- **Brand Consistency**: Matches your site's design

## 🔄 **Updating Templates:**

1. **Edit the files**: Modify `resume-request.html` and `resume-request.txt`
2. **Test locally**: Make sure the build works
3. **Deploy**: Push to GitHub for automatic Vercel deployment
4. **Test live**: Send a test resume request

## 💡 **Pro Tips:**

- **Keep it Simple**: Don't over-design - focus on readability
- **Test Everywhere**: Different email clients render HTML differently
- **Mobile First**: Most people read emails on mobile devices
- **Brand Consistency**: Use colors and fonts that match your site
- **Clear Call-to-Action**: Make the download button obvious

Your email templates are now much easier to customize and maintain! 🎉
