import { getSiteInformation } from '../../../lib/contentful'
import Layout from '../../components/layout'
import SEO from '../../components/seo'

export const metadata = {
  title: 'Privacy Policy | Michael Lunzer',
  description: 'Privacy policy for michaellunzer.com, covering SMS messaging and personal data handling.',
}

export default async function PrivacyPolicyPage() {
  let siteInfo = null
  try {
    siteInfo = await getSiteInformation()
  } catch (error) {
    console.error('Error loading site info:', error)
  }

  return (
    <Layout header="privacy" siteInfo={siteInfo}>
      <SEO
        title="Privacy Policy"
        keywords={['Privacy Policy', 'Michael Lunzer', 'SMS']}
        siteInfo={siteInfo}
      />
      <div className="site-container">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px 60px' }}>
                <h1>Privacy Policy</h1>
                <p><strong>Effective Date:</strong> May 5, 2026<br /><strong>Last Updated:</strong> May 5, 2026</p>
                <hr />

                <h2>1. Overview</h2>
                <p>This Privacy Policy describes how Michael Lunzer (&ldquo;I,&rdquo; &ldquo;me,&rdquo; or &ldquo;my&rdquo;) collects, uses, and protects your personal information when you interact with me via SMS text messaging or through my website at <a href="https://michaellunzer.com">https://michaellunzer.com</a>.</p>

                <hr />

                <h2>2. Information I Collect</h2>
                <p>I may collect the following information from you:</p>
                <ul>
                  <li><strong>Mobile phone number</strong> &mdash; when you opt in to receive SMS messages</li>
                  <li><strong>Name and contact details</strong> &mdash; when provided through a website form or direct communication</li>
                  <li><strong>Message content</strong> &mdash; the content of SMS messages you send to me as part of two-way customer support conversations</li>
                </ul>

                <hr />

                <h2>3. How I Use Your Information</h2>
                <p>I use your information solely to:</p>
                <ul>
                  <li>Respond to your customer support inquiries via SMS</li>
                  <li>Send you information you have explicitly requested</li>
                  <li>Maintain records of our communications for service quality purposes</li>
                </ul>

                <hr />

                <h2>4. SMS Messaging</h2>

                <h3>Opt-In</h3>
                <p>You may opt in to receive SMS messages from me in one of two ways:</p>
                <ul>
                  <li><strong>Website form:</strong> By submitting your mobile number through the opt-in form at <a href="https://michaellunzer.com">https://michaellunzer.com</a></li>
                  <li><strong>Text keyword:</strong> By texting a keyword to my number to initiate contact</li>
                </ul>
                <p>By opting in, you consent to receive SMS messages related to customer support and any topics you have inquired about.</p>

                <h3>Opt-Out</h3>
                <p>You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any message. After opting out, you will receive a single confirmation message and no further messages will be sent unless you opt in again.</p>
                <p>To get help, reply <strong>HELP</strong> to any message.</p>

                <h3>Message Frequency</h3>
                <p>Message frequency varies based on your support needs and the nature of your inquiry.</p>

                <h3>Message and Data Rates</h3>
                <p>Standard message and data rates may apply depending on your mobile carrier and plan.</p>

                <hr />

                <h2>5. Sharing of Information</h2>
                <p><strong>Your mobile phone number and any information collected through SMS will not be shared with third parties or affiliates for marketing or promotional purposes.</strong></p>
                <p>I do not sell, rent, or trade your personal information. I will not share your information with any third party except:</p>
                <ul>
                  <li>As required by law or legal process</li>
                  <li>To protect my rights or the safety of others</li>
                  <li>With service providers strictly necessary to deliver the SMS service (e.g., Twilio as my SMS platform provider), who are bound by their own privacy and data protection obligations</li>
                </ul>

                <hr />

                <h2>6. Data Retention</h2>
                <p>I retain your information only as long as necessary to fulfill the purposes described in this policy or as required by law. You may request deletion of your information at any time by contacting me directly.</p>

                <hr />

                <h2>7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Request access to the personal information I hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of SMS communications at any time by replying STOP</li>
                </ul>

                <hr />

                <h2>8. Contact</h2>
                <p>If you have any questions about this Privacy Policy or how your information is handled, please contact me at:</p>
                <p>
                  <strong>Michael Lunzer</strong><br />
                  Website: <a href="https://michaellunzer.com">https://michaellunzer.com</a>
                </p>

                <hr />

                <p><em>This policy applies to SMS communications facilitated through Twilio&rsquo;s A2P 10DLC messaging platform.</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
