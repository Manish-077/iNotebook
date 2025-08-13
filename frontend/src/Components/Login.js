// Components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      
      if (json.success) {
        localStorage.setItem('token', json.authtoken);
        showAlert("Login successful! Welcome back.", "success");
        navigate("/");
      } else {
        setError(json.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError("");
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
                Welcome Back
              </h2>
              <p style={{ color: 'var(--gray-600)' }}>Sign in to continue to iNotebook</p>
            </div>

            {/* Form */}
            {error && (
              <div className="alert alert-danger" style={{ backgroundColor: 'var(--danger-color)10', border: 'none', color: 'var(--danger-color)' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 'var(--spacing-4)' }}>
                <label htmlFor="email" className="form-label" style={{ fontWeight: '500' }}>Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  name="email" 
                  value={credentials.email} 
                  onChange={onChange}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <label htmlFor="password" className="form-label" style={{ fontWeight: '500' }}>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  name="password" 
                  value={credentials.password} 
                  onChange={onChange}
                  placeholder="Enter your password"
                  required
                />
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
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Sign up link */}
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-6)' }}>
              <p style={{ color: 'var(--gray-600)', marginBottom: 0 }}>
                Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: '500' }}>Sign up</Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
