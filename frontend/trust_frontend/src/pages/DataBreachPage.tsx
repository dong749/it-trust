/* eslint-disable react/button-has-type */
import React from 'react';

const DataBreachPage: React.FC = () => {
  return (
    <div style={{ padding: '40px 5vw', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 顶部横幅区 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          marginBottom: '60px',
        }}
      >
        <img
          src="/DataBreachTitle.png"
          alt="Data Breach"
          style={{
            flex: '1 1 400px',
            maxWidth: '500px',
            borderRadius: '12px',
            width: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{ flex: '1 1 300px' }}>
          <h1 style={{ fontSize: '48px', color: '#fff', marginBottom: '12px' }}>Data Breach</h1>
          <h2 style={{ color: '#ccc', fontWeight: 400 }}>
            Learn what data breaches are, how they happen, and how to protect your personal
            information.
          </h2>
        </div>
      </div>

      {/* 提示条 */}
      <div
        style={{
          backgroundColor: '#f3f4f6',
          borderRadius: '10px',
          padding: '16px 24px',
          marginBottom: '40px',
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
          🚨 Test Your Data Breach Awareness
        </div>
        <p style={{ fontSize: '14px', color: '#444', margin: '8px 0 16px' }}>
          Take a short quiz to test your knowledge about data breaches and prevention.
        </p>
        <button
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#ef4444',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Get Started →
        </button>
      </div>

      <section>
        <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px' }}>
          What Is a Data Breach?
        </h2>
        <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
          A data breach is an incident in which sensitive, protected, or confidential information is
          accessed or disclosed without authorization. These breaches can expose personal data such
          as names, email addresses, passwords, credit card numbers, and even medical records.
        </p>
      </section>

      <hr style={{ borderColor: '#444', margin: '40px 0' }} />

      <section>
        <h2 style={{ fontSize: '28px', color: '#fff' }}>Common Causes of Data Breaches</h2>
        <ol style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
          <li>Weak or stolen passwords: One of the most common entry points for hackers.</li>
          <li>
            Phishing attacks: Deceptive emails or links tricking users into sharing credentials.
          </li>
          <li>Software vulnerabilities: Outdated software or unpatched systems being exploited.</li>
          <li>Human error: Accidental data sharing or misconfiguration of access settings.</li>
        </ol>
      </section>

      <div style={{ marginTop: '40px', borderRadius: '12px', overflow: 'hidden' }}>
        <iframe
          src="https://www.youtube.com/embed/NeUmClyrwBs"
          title="What Is a Data Breach?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            height: '400px',
            border: 'none',
          }}
        ></iframe>
      </div>

      <hr style={{ borderColor: '#444', margin: '40px 0' }} />

      <section>
        <h2 style={{ fontSize: '28px', color: '#fff' }}>Impacts of Data Breaches</h2>
        <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
          Data breaches can have severe consequences for both individuals and organizations. Victims
          may suffer identity theft, financial loss, or damage to reputation. Companies can face
          regulatory fines, legal actions, and loss of consumer trust.
        </p>
      </section>

      <hr style={{ borderColor: '#444', margin: '40px 0' }} />

      <section>
        <h2 style={{ fontSize: '28px', color: '#fff' }}>Conclusion</h2>
        <p style={{ fontSize: '16px', color: '#ccc', lineHeight: 1.7 }}>
          Data breaches are increasingly common in today’s digital landscape. By understanding the
          risks and taking proactive steps to secure your information, you can reduce your
          vulnerability and help prevent personal or organizational damage.
        </p>
      </section>
    </div>
  );
};

export default DataBreachPage;
