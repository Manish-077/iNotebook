import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ showAlert }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/getuser`, {
          method: 'GET',
          headers: {
            'auth-token': token
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUserInfo(data.user);
          } else {
            throw new Error("User data not found in the server response.");
          }
        } else {
          localStorage.removeItem('token');
          showAlert("Your session has expired. Please log in again.", "danger");
          navigate('/login');
        }
      } catch (err) {
        console.error('Error fetching user info:', err);
        setError("Could not fetch your profile. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Note: `showAlert` is excluded from the dependency array. If it were included,
    // it could cause this effect to re-run on every parent render unless it's
    // memoized with `useCallback` in the parent component.
  }, [navigate,showAlert]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    showAlert("Logged out successfully!", "success");
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <p>Loading your profile...</p>
      </div>
    );
  }
  
  if (error) {
    return (
        <div className="container text-center mt-5">
            <div className="alert alert-danger">{error}</div>
        </div>
    );
  }

  if (!userInfo) {
    return (
        <div className="container text-center mt-5">
            <div className="alert alert-warning">Could not load user information.</div>
        </div>
    );
  }
  
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
        maxWidth: '500px',
        width: '100%',
        border: 'none',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div className="card-body" style={{ padding: 'var(--spacing-8)' }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
              <img src="/favicon.png" alt="Logo" style={{ height: '60px', width: '60px', marginBottom: 'var(--spacing-4)'}} />
              <h2 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: '600',
                color: 'var(--secondary-color)'
              }}>
                User Profile
              </h2>
            </div>

            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <div style={{
                  padding: 'var(--spacing-4)',
                  backgroundColor: 'var(--gray-100)',
                  borderRadius: 'var(--radius-lg)',
              }}>
                <div className="mb-3"><strong>Name:</strong> {userInfo.name}</div>
                <div><strong>Email:</strong> {userInfo.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="btn w-100"
              style={{
                backgroundColor: 'var(--secondary-color)',
                color: 'var(--white)',
                padding: 'var(--spacing-3)',
                fontWeight: '500'
              }}
            >
              Logout
            </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 