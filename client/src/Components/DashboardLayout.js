import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/create-invoice', icon: '➕', label: 'Create Invoice' },
    { path: '/invoices', icon: '📄', label: 'All Invoices' },
    { path: '/business', icon: '🏢', label: 'Business Details' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div style={styles.layoutContainer}>
      {/* Mobile Menu Button */}
      {isMobile && (
        <button 
          style={styles.mobileMenuBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg style={styles.menuIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        ...styles.sidebar,
        ...(isMobile ? {
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        } : {}),
      }}>
        {/* Logo Section */}
        <div style={styles.sidebarHeader}>
          <div style={styles.logoBox}>
            <svg style={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 style={styles.brandName}>InvoicePro</h2>
        </div>

        {/* Navigation Menu */}
        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navItem,
                background: location.pathname === item.path ? 'linear-gradient(to right, rgba(5, 150, 105, 0.1), rgba(8, 145, 178, 0.1))' : 'transparent',
                borderLeft: location.pathname === item.path ? '4px solid #059669' : '4px solid transparent',
              }}
              onClick={() => setSidebarOpen(false)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={{
                ...styles.navLabel,
                color: location.pathname === item.path ? '#059669' : '#6B7280',
                fontWeight: location.pathname === item.path ? '600' : '500',
              }}>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div style={styles.sidebarFooter}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <svg style={styles.logoutIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        ...styles.mainContent,
        ...(isMobile ? {
          marginLeft: '0',
          padding: '80px 16px 16px 16px',
        } : {}),
      }}>
        {children}
      </main>
    </div>
  );
};

const styles = {
  layoutContainer: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f9fafb',
    position: 'relative',
  },
  mobileMenuBtn: {
    position: 'fixed',
    top: '16px',
    left: '16px',
    zIndex: 50,
    padding: '8px',
    background: '#fff',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  menuIcon: {
    width: '24px',
    height: '24px',
    color: '#374151',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 40,
  },
  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto',
    transition: 'transform 0.3s ease',
    zIndex: 45,
    left: 0,
    top: 0,
  },
  sidebarHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  logoBox: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #059669, #0891b2)',
    borderRadius: '12px',
    marginBottom: '12px',
  },
  logoIcon: {
    width: '28px',
    height: '28px',
    color: '#fff',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1F2937',
    margin: 0,
  },
  nav: {
    flex: 1,
    padding: '16px 0',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 24px',
    textDecoration: 'none',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  navIcon: {
    fontSize: '20px',
  },
  navLabel: {
    fontSize: '15px',
  },
  sidebarFooter: {
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
  },
  logoutBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(to right, #ef4444, #dc2626)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  logoutIcon: {
    width: '18px',
    height: '18px',
  },
  mainContent: {
    flex: 1,
    marginLeft: '280px',
    padding: '32px',
    transition: 'margin-left 0.3s ease',
  },
};

export default DashboardLayout;