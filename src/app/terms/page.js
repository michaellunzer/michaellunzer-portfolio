import { getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

export const metadata = {
  title: 'Terms and Conditions | Michael Lunzer',
  description: 'Terms and conditions for michaellunzer.com, covering SMS messaging and acceptable use.',
}

export default async function TermsPage() {
  let siteInfo = null
  try {
    siteInfo = await getSiteInformation()
  } catch (error) {
    console.error('Error loading site info:', error)
  }

  return (
    <Layout header="terms" siteInfo={siteInfo}>
      <SEO
        title="Terms and Conditions"
        keywords={['Terms and Conditions', 'Michael Lunzer', 'SMS']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px 60px' }}>
                <h1>Terms and Conditions</h1>
                <p><strong>Effective Date:</strong> May 5, 2026<br /><strong>Last Updated:</strong> May 5, 2026</p>
                <hr />

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing my website at <a href="https://michaellunzer.com">https://michaellunzer.com</a> or opting in to receive SMS messages from me, you agree to these Terms and Conditions. If you do not agree, please do not use my services or opt in to SMS communications.</p>

                <hr />

                <h2>2. SMS Messaging Service</h2>

                <h3>Description</h3>
                <p>I offer a two-way SMS customer support service that allows you to communicate with me directly via text message. This service is intended to help answer questions, provide information, and resolve support inquiries.</p>

                <h3>Eligibility</h3>
                <p>By opting in to SMS messaging, you confirm that:</p>
                <ul>
                  <li>You are the account holder or have the account holder&rsquo;s permission to use the mobile number provided</li>
                  <li>You are 18 years of age or older</li>
                  <li>You are located in the United States or Canada</li>
                </ul>

                <h3>Opt-In</h3>
                <p>You may opt in to receive SMS messages in one of two ways:</p>
                <ul>
                  <li><strong>Website form:</strong> By submitting your mobile number through the opt-in form at <a href="https://michaellunzer.com">https://michaellunzer.com</a></li>
                  <li><strong>Text keyword:</strong> By texting a keyword to my number</li>
                </ul>
                <p>By opting in, you expressly consent to receive text messages from me related to customer support.</p>

                <h3>Opt-Out</h3>
                <p>You may opt out at any time by replying <strong>STOP</strong> to any message. You will receive a single confirmation message and no further messages will be sent. To re-subscribe, opt in again through any available opt-in method.</p>

                <h3>Help</h3>
                <p>Reply <strong>HELP</strong> to any message for assistance, or contact me directly through my website.</p>

                <h3>Message Frequency</h3>
                <p>Message frequency varies based on the nature of your inquiry and support needs.</p>

                <h3>Costs</h3>
                <p>Message and data rates may apply. I am not responsible for any charges applied by your mobile carrier.</p>

                <hr />

                <h2>3. Acceptable Use</h2>
                <p>When using my SMS service or website, you agree not to:</p>
                <ul>
                  <li>Use the service for any unlawful purpose</li>
                  <li>Send abusive, threatening, or harassing messages</li>
                  <li>Impersonate any person or entity</li>
                  <li>Attempt to gain unauthorized access to any system or network</li>
                  <li>Use the service to transmit spam or unsolicited communications</li>
                </ul>
                <p>I reserve the right to discontinue SMS service to any user who violates these terms.</p>

                <hr />

                <h2>4. Intellectual Property</h2>
                <p>All content on <a href="https://michaellunzer.com">https://michaellunzer.com</a>, including text, graphics, and other materials, is owned by Michael Lunzer and may not be reproduced, distributed, or used without prior written permission.</p>

                <hr />

                <h2>5. Disclaimer of Warranties</h2>
                <p>My services are provided &ldquo;as is&rdquo; without warranties of any kind, either express or implied. I do not warrant that:</p>
                <ul>
                  <li>The service will be uninterrupted or error-free</li>
                  <li>SMS messages will be delivered instantaneously or at all times</li>
                  <li>The website will be free from viruses or other harmful components</li>
                </ul>

                <hr />

                <h2>6. Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, Michael Lunzer shall not be liable for any indirect, incidental, special, or consequential damages arising out of your use of &mdash; or inability to use &mdash; the SMS service or website, including any damages resulting from delayed or undelivered messages.</p>

                <hr />

                <h2>7. Privacy</h2>
                <p>Your use of this service is also governed by my <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these Terms by reference.</p>

                <hr />

                <h2>8. Changes to These Terms</h2>
                <p>I may update these Terms and Conditions from time to time. Changes will be posted at <a href="https://michaellunzer.com/terms">https://michaellunzer.com/terms</a> with an updated effective date. Continued use of the service after changes are posted constitutes your acceptance of the revised terms.</p>

                <hr />

                <h2>9. Governing Law</h2>
                <p>These Terms are governed by the laws of the State of California, without regard to its conflict of law provisions.</p>

                <hr />

                <h2>10. Contact</h2>
                <p>If you have any questions about these Terms and Conditions, please contact me at:</p>
                <p>
                  <strong>Michael Lunzer</strong><br />
                  Website: <a href="https://michaellunzer.com">https://michaellunzer.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
