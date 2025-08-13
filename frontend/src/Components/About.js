// Components/About.js
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="fade-in" style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', padding: 'var(--spacing-8) 0' }}>
      <div className="container">
        {/* Hero Section */}
        <header style={{
          textAlign: 'center',
          padding: 'var(--spacing-12) var(--spacing-4)',
          marginBottom: 'var(--spacing-12)',
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-2xl)',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--gray-200)',
          background: `
            radial-gradient(circle at top left, var(--primary-light), transparent 40%),
            radial-gradient(circle at bottom right, var(--primary-light), transparent 40%)
          `
        }}>
          <img src="/favicon.png" alt="iNotebook Logo" style={{ height: '80px', width: '80px', marginBottom: 'var(--spacing-6)' }} />
          <h1 style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: '700',
            color: 'var(--secondary-color)',
            marginBottom: 'var(--spacing-4)'
          }}>
            Welcome to iNotebook
          </h1>
          <p style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--gray-600)',
            maxWidth: '700px',
            margin: '0 auto var(--spacing-6)',
            lineHeight: '1.7'
          }}>
            Your personal, secure, and modern digital notebook. Capture your thoughts, ideas, and memories with an intuitive and beautiful interface.
          </p>
          <Link 
            to="/signup"
            className="btn"
            style={{
                backgroundColor: 'var(--primary-color)',
                color: 'var(--white)',
                padding: 'var(--spacing-3) var(--spacing-8)',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                fontWeight: '500'
            }}
          >
            Get Started for Free
          </Link>
        </header>

        {/* Features Section */}
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'var(--font-size-3xl)',
            fontWeight: '600',
            color: 'var(--secondary-color)',
            marginBottom: 'var(--spacing-8)'
          }}>
            Why You'll Love iNotebook
          </h2>
          <div className="row">
            {/* Feature 1: Secure & Private */}
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ padding: 'var(--spacing-4)' }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--primary-color)', marginBottom: 'var(--spacing-4)' }}>
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h3 className="card-title" style={{ fontWeight: '600' }}>Secure & Private</h3>
                  <p className="card-text">Your notes are for your eyes only. With robust authentication, your data is always protected and secure in the cloud.</p>
                </div>
              </div>
            </div>
            {/* Feature 2: Cross-Platform */}
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ padding: 'var(--spacing-4)' }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--accent-color)', marginBottom: 'var(--spacing-4)' }}>
                    <i className="fas fa-sync-alt"></i>
                  </div>
                  <h3 className="card-title" style={{ fontWeight: '600' }}>Access Anywhere</h3>
                  <p className="card-text">Your notes sync seamlessly across all your devices. Access and edit on your desktop, tablet, or mobile.</p>
                </div>
              </div>
            </div>
            {/* Feature 3: Intuitive Design */}
            <div className="col-md-4 mb-4">
              <div className="card h-100" style={{ padding: 'var(--spacing-4)' }}>
                <div className="card-body text-center">
                  <div style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--success-color)', marginBottom: 'var(--spacing-4)' }}>
                    <i className="fas fa-feather-alt"></i>
                  </div>
                  <h3 className="card-title" style={{ fontWeight: '600' }}>Intuitive Design</h3>
                  <p className="card-text">A clean, beautiful, and distraction-free interface designed to help you focus on what matters most: your ideas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;