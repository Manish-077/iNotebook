// Components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkAuth();
        const interval = setInterval(checkAuth, 1000); // Periodically check auth status
        return () => clearInterval(interval);
    }, [location]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`} 
             style={{
                 backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'var(--gray-50)',
                 backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                 borderBottom: '1px solid var(--gray-200)',
                 transition: 'all var(--transition-normal)',
                 position: 'fixed',
                 top: 0,
                 left: 0,
                 right: 0,
                 zIndex: 1000,
                 padding: isScrolled ? '0.5rem 0' : '1rem 0'
             }}>
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/" style={{
                    fontWeight: '700',
                    color: 'var(--secondary-color)',
                    textDecoration: 'none',
                    gap: '12px'
                }}>
                    <img src="/favicon.png" alt="iNotebook Logo" style={{ height: '40px', width: '40px' }} />
                    <span style={{ fontSize: 'var(--font-size-xl)' }}>iNotebook</span>
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleMobileMenu}
                    style={{
                        border: 'none',
                        padding: 'var(--spacing-2)',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--gray-100)'
                    }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ marginLeft: 'auto' }}>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link`} 
                                to="/"
                                style={{
                                    color: location.pathname === "/" ? 'var(--primary-color)' : 'var(--gray-700)',
                                    fontWeight: '500',
                                    padding: 'var(--spacing-2) var(--spacing-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'all var(--transition-fast)',
                                    textDecoration: 'none'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className={`nav-link`} 
                                to="/about"
                                style={{
                                    color: location.pathname === "/about" ? 'var(--primary-color)' : 'var(--gray-700)',
                                    fontWeight: '500',
                                    padding: 'var(--spacing-2) var(--spacing-4)',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'all var(--transition-fast)',
                                    textDecoration: 'none'
                                }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                    
                    <div className="d-flex gap-2" style={{ alignItems: 'center' }}>
                        {isLoggedIn ? (
                            <>
                                <Link 
                                    to="/profile"
                                    className='btn'
                                    style={{
                                        color: 'var(--secondary-color)',
                                        padding: 'var(--spacing-2) var(--spacing-4)',
                                        textDecoration: 'none'
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                
                                <button 
                                    onClick={handleLogout}
                                    className='btn'
                                    style={{
                                        backgroundColor: 'var(--secondary-color)',
                                        color: 'var(--white)',
                                        padding: 'var(--spacing-2) var(--spacing-4)',
                                        borderRadius: 'var(--radius-lg)',
                                        border: 'none',
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    className='btn' 
                                    to="/login" 
                                    style={{
                                        color: 'var(--primary-color)',
                                        textDecoration: 'none'
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                
                                <Link 
                                    className='btn' 
                                    to="/signup"
                                    style={{
                                        backgroundColor: 'var(--primary-color)',
                                        color: 'var(--white)',
                                        padding: 'var(--spacing-2) var(--spacing-4)',
                                        borderRadius: 'var(--radius-lg)',
                                        textDecoration: 'none'
                                    }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
