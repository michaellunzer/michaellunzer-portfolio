const fs = require('fs');
const path = require('path');

/**
 * Load and process email template with variable substitution
 * @param {string} templateName - Name of the template (without extension)
 * @param {Object} variables - Variables to substitute in the template
 * @returns {Object} Object with html and text versions of the email
 */
function loadEmailTemplate(templateName, variables = {}) {
  try {
    // Load HTML template
    const htmlPath = path.join(process.cwd(), 'src', 'emails', `${templateName}.html`);
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // Load text template
    const textPath = path.join(process.cwd(), 'src', 'emails', `${templateName}.txt`);
    let textContent = fs.readFileSync(textPath, 'utf8');
    
    // Replace variables in both templates
    Object.keys(variables).forEach(key => {
      const placeholder = `{{${key}}}`;
      const value = variables[key];
      
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value);
      textContent = textContent.replace(new RegExp(placeholder, 'g'), value);
    });
    
    return {
      html: htmlContent,
      text: textContent
    };
  } catch (error) {
    console.error(`Error loading email template ${templateName}:`, error);
    
    // Fallback to inline template if file loading fails
    return {
      html: `
        <p>Hi there!</p>
        <p>Thanks for requesting my resume! You can download it using the link below:</p>
        <p><a href="${variables.RESUME_URL || '#'}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">📄 Download Resume</a></p>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #666;">${variables.RESUME_URL || '#'}</p>
        <p>Best regards,<br>Michael Lunzer</p>
      `,
      text: `Hi there!\n\nThanks for requesting my resume! You can download it using the link below:\n\n${variables.RESUME_URL || '#'}\n\nBest regards,\nMichael Lunzer`
    };
  }
}

module.exports = {
  loadEmailTemplate
};
