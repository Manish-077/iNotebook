// Components/Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token.length > 0) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Password validation
    if (credentials.password !== credentials.cpassword) {
      const errorMessage = "Passwords do not match";
      setError(errorMessage);
      if (showAlert) {
        showAlert(errorMessage, "danger");
      }
      setIsLoading(false);
      return;
    }

    if (credentials.password.length < 5) {
      const errorMessage = "Password must be at least 5 characters long";
      setError(errorMessage);
      if (showAlert) {
        showAlert(errorMessage, "danger");
      }
      setIsLoading(false);
      return;
    }

    try {
      const { name, email, password } = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const json = await response.json();
      
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        if (showAlert) {
          showAlert("Account created successfully! Welcome to iNotebook.", "success");
        }
        navigate("/");
      } else {
        const errorMessage = json.error || "Failed to create account";
        setError(errorMessage);
        if (showAlert) {
          showAlert(errorMessage, "danger");
        }
      }
    } catch (error) {
      const errorMessage = "Network error. Please try again.";
      setError(errorMessage);
      if (showAlert) {
        showAlert(errorMessage, "danger");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing
  };

  return (
    <div className="fade-in" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-4)',
      background: 'var(--gray-50)'
    }}>
      <div className="card" style={{
        maxWidth: '450px',
        width: '100%',
        border: 'none',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div className="card-body" style={{ padding: 'var(--spacing-8)' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
              <img src="/favicon.png" alt="Logo" style={{ height: '60px', width: '60px', marginBottom: 'var(--spacing-4)'}} />
              <h2 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: '600',
                color: 'var(--secondary-color)'
              }}>
                Create Your Account
              </h2>
              <p style={{ color: 'var(--gray-600)' }}>Join iNotebook to start creating notes</p>
            </div>

            {/* Form */}
            {error && (
              <div className="alert alert-danger" style={{ backgroundColor: 'var(--danger-color)10', border: 'none', color: 'var(--danger-color)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                  <label htmlFor="name" className="form-label" style={{ fontWeight: '500' }}>Full Name</label>
                  <input type="text" className="form-control" id="name" name='name' onChange={onChange} required placeholder="John Doe" />
              </div>
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                  <label htmlFor="email" className="form-label" style={{ fontWeight: '500' }}>Email address</label>
                  <input type="email" className="form-control" id="email" name='email' onChange={onChange} required placeholder="name@example.com" />
              </div>
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                  <label htmlFor="password" className="form-label" style={{ fontWeight: '500' }}>Password</label>
                  <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} placeholder="5+ characters" />
              </div>
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                  <label htmlFor="cpassword" className="form-label" style={{ fontWeight: '500' }}>Confirm Password</label>
                  <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} />
              </div>
              <button 
                type="submit" 
                className="btn w-100"
                disabled={isLoading}
                style={{
                  backgroundColor: 'var(--primary-color)',
                  color: 'var(--white)',
                  padding: 'var(--spacing-3)',
                  fontWeight: '500'
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Sign in link */}
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-6)' }}>
              <p style={{ color: 'var(--gray-600)', marginBottom: 0 }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Sign in</Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;