import React from "react";
import styles from "./PrivacyPolicy.module.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className={styles.privacyContainer}>
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> April 10, 2025</p>

      <p>Thank you for using <strong>Sortify</strong>.</p>

      <p>
        Sortify is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our services, particularly with regards to Gmail integration via Google OAuth.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you connect your Google account to Sortify, we access:
      </p>
      <ul>
        <li>Your <strong>display name</strong> (to personalize the experience)</li>
        <li>The <strong>content of your recent emails</strong> to extract to-do items using AI</li>
      </ul>
      <p>We do <strong>not</strong> collect your password or any sensitive credentials.</p>

      <h2>How We Use Your Information</h2>
      <p>We use the information we access solely to help you be more productive:</p>
      <ul>
        <li>Display your name in the interface</li>
        <li>Analyze email content to generate a smart, focused to-do list</li>
        <li>Show this list to you in-app only</li>
      </ul>
      <p>We <strong>do not</strong> store your emails or any user data on our servers.</p>

      <h2>Data Storage & Retention</h2>
      <p>Sortify processes all email data <strong>temporarily and in-memory</strong>. We do not store, share, or persist any of your Gmail content.</p>

      <h2>Sharing and Disclosure</h2>
      <p>We <strong>never</strong> share your personal data or email content with third parties. We do not use your data for advertising or marketing.</p>

      <h2>Google API Services Compliance</h2>
      <p>
        Sortify’s use of information received from Google APIs adheres to the{" "}
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google API Services User Data Policy
        </a>
        , including the Limited Use requirements.
      </p>

      <h2>Your Consent</h2>
      <p>
        By using Sortify and connecting your Gmail account, you consent to the access and temporary use of your information as outlined in this policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions or concerns about this Privacy Policy, please contact us at:<br />
        <strong>📧 +63 995 718 1642</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
