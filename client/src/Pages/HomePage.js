import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check visibility of feature cards
      const elements = document.querySelectorAll('.feature-card');
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight - 100;
        setIsVisible(prev => ({ ...prev, [index]: isInView }));
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Create professional invoices in under 60 seconds",
      gradient: "linear-gradient(135deg, #059669 0%, #0891b2 100%)"
    },
    {
      icon: "🎨",
      title: "Beautiful Templates",
      description: "Stunning, customizable invoice designs that impress clients",
      gradient: "linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)"
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Track payments, revenue, and business growth in real-time",
      gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)"
    },
    {
      icon: "🔒",
      title: "Bank-Level Security",
      description: "Your data protected with enterprise-grade encryption",
      gradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)"
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Manage invoices anywhere, anytime on any device",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    {
      icon: "🤝",
      title: "Client Portal",
      description: "Let clients view and pay invoices with one click",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #0891b2 100%)"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Users" },
    { number: "1M+", label: "Invoices Created" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background Blobs */}
      <div style={{...styles.blob1, transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`}}></div>
      <div style={{...styles.blob2, transform: `translate(-${scrollY * 0.08}px, ${scrollY * 0.06}px)`}}></div>
      <div style={{...styles.blob3, transform: `translate(${scrollY * 0.06}px, -${scrollY * 0.04}px)`}}></div>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <svg style={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span style={styles.logoText}>InvoicePro</span>
          </div>
          <div style={styles.navLinks}>
            <button style={styles.loginBtn} onClick={() => window.location.href = '/login'}>
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={{...styles.badge, opacity: Math.max(0, 1 - scrollY / 300)}}>
            <span style={styles.badgeDot}></span>
            Trusted by 50,000+ businesses worldwide
          </div>
          
          <h1 style={{...styles.heroTitle, transform: `translateY(${scrollY * 0.1}px)`}}>
            Invoice Smarter,
            <br />
            <span style={styles.gradient}>Get Paid Faster</span>
          </h1>
          
          <p style={{...styles.heroSubtitle, transform: `translateY(${scrollY * 0.15}px)`}}>
            Create professional invoices in seconds, track payments effortlessly, 
            and grow your business with confidence. No credit card required.
          </p>

          <div style={{...styles.ctaButtons, opacity: Math.max(0, 1 - scrollY / 400)}}>
            <button 
              style={styles.primaryBtn}
              onClick={() => window.location.href = '/register'}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(5, 150, 105, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(5, 150, 105, 0.2)';
              }}
            >
              Start Free Trial
              <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button 
              style={styles.secondaryBtn}
              onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Watch Demo
              <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Floating Cards Preview */}
          <div style={styles.floatingPreview}>
            <div style={{...styles.previewCard1, transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`}}>
              <div style={styles.previewHeader}>
                <div style={styles.previewDot}></div>
                <div style={styles.previewDot}></div>
                <div style={styles.previewDot}></div>
              </div>
              <div style={styles.previewContent}>
                <div style={styles.previewLine1}></div>
                <div style={styles.previewLine2}></div>
                <div style={styles.previewLine3}></div>
              </div>
            </div>
            
            <div style={{...styles.previewCard2, transform: `translateY(${Math.sin(scrollY * 0.01 + 1) * 15}px)`}}>
              <div style={styles.checkIcon}>✓</div>
              <div style={styles.previewText}>Invoice Paid!</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div 
              key={index} 
              style={{
                ...styles.statCard,
                transform: scrollY > 200 ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                opacity: scrollY > 200 ? 1 : 0,
                transitionDelay: `${index * 0.1}s`
              }}
            >
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>FEATURES</span>
          <h2 style={styles.sectionTitle}>
            Everything you need to
            <br />
            <span style={styles.gradient}>invoice like a pro</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Powerful features designed to save you time and impress your clients
          </p>
        </div>

        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                ...styles.featureCard,
                transform: isVisible[index] ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                opacity: isVisible[index] ? 1 : 0,
                transitionDelay: `${(index % 3) * 0.1}s`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{...styles.featureIcon, background: feature.gradient}}>
                <span style={styles.featureEmoji}>{feature.icon}</span>
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>
            Ready to transform your invoicing?
          </h2>
          <p style={styles.ctaSubtitle}>
            Join thousands of businesses already using InvoicePro
          </p>
          <div style={styles.ctaButtons}>
            <button 
              style={styles.ctaPrimaryBtn}
              onClick={() => window.location.href = '/register'}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.1)';
              }}
            >
              Get Started Free
            </button>
            <button 
              style={styles.ctaSecondaryBtn}
              onClick={() => window.location.href = '/login'}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <svg style={styles.footerLogoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span style={styles.footerLogoText}>InvoicePro</span>
          </div>
          <p style={styles.footerText}>
            © 2025 InvoicePro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ecfdf5 0%, #cffafe 50%, #dbeafe 100%)",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "fixed",
    top: "-10%",
    left: "-5%",
    width: "500px",
    height: "500px",
    background: "#a7f3d0",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.3,
    zIndex: 0,
  },
  blob2: {
    position: "fixed",
    top: "20%",
    right: "-10%",
    width: "600px",
    height: "600px",
    background: "#a5f3fc",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.3,
    zIndex: 0,
  },
  blob3: {
    position: "fixed",
    bottom: "-15%",
    left: "30%",
    width: "550px",
    height: "550px",
    background: "#bfdbfe",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.3,
    zIndex: 0,
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: "20px 0",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
    zIndex: 1000,
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    color: "#059669",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #059669, #0891b2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  loginBtn: {
    padding: "10px 24px",
    background: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  hero: {
    position: "relative",
    zIndex: 1,
    paddingTop: "140px",
    paddingBottom: "100px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    textAlign: "center",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 20px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "50px",
    fontSize: "14px",
    color: "#059669",
    fontWeight: "500",
    marginBottom: "30px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    transition: "opacity 0.3s",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    background: "#10b981",
    borderRadius: "50%",
    animation: "pulse 2s infinite",
  },
  heroTitle: {
    fontSize: "clamp(40px, 8vw, 72px)",
    fontWeight: "800",
    lineHeight: "1.1",
    color: "#1F2937",
    marginBottom: "25px",
    transition: "transform 0.3s",
  },
  gradient: {
    background: "linear-gradient(135deg, #059669, #0891b2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "clamp(16px, 3vw, 20px)",
    color: "#6B7280",
    maxWidth: "700px",
    margin: "0 auto 40px",
    lineHeight: "1.6",
    transition: "transform 0.3s",
  },
  ctaButtons: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
    flexWrap: "wrap",
    transition: "opacity 0.3s",
  },
  primaryBtn: {
    padding: "16px 40px",
    background: "linear-gradient(135deg, #059669, #0891b2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 10px 30px rgba(5, 150, 105, 0.2)",
    transition: "all 0.3s",
  },
  secondaryBtn: {
    padding: "16px 40px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    color: "#1F2937",
    border: "2px solid rgba(5, 150, 105, 0.3)",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s",
  },
  btnIcon: {
    width: "20px",
    height: "20px",
  },
  floatingPreview: {
    marginTop: "80px",
    position: "relative",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
  },
  previewCard1: {
    width: "280px",
    height: "200px",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    transition: "transform 0.3s",
  },
  previewCard2: {
    width: "200px",
    height: "120px",
    background: "linear-gradient(135deg, #059669, #0891b2)",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(5, 150, 105, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "transform 0.3s",
  },
  previewHeader: {
    display: "flex",
    gap: "8px",
    marginBottom: "20px",
  },
  previewDot: {
    width: "12px",
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "50%",
  },
  previewContent: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  previewLine1: {
    height: "12px",
    background: "linear-gradient(90deg, #a7f3d0, #a5f3fc)",
    borderRadius: "6px",
    width: "80%",
  },
  previewLine2: {
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "6px",
    width: "60%",
  },
  previewLine3: {
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "6px",
    width: "70%",
  },
  checkIcon: {
    width: "40px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "white",
    fontWeight: "700",
  },
  previewText: {
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
  },
  statsSection: {
    position: "relative",
    zIndex: 1,
    padding: "60px 20px",
  },
  statsGrid: {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
  },
  statCard: {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  statNumber: {
    fontSize: "42px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #059669, #0891b2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "16px",
    color: "#6B7280",
    fontWeight: "500",
  },
  featuresSection: {
    position: "relative",
    zIndex: 1,
    padding: "100px 20px",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "80px",
  },
  sectionBadge: {
    display: "inline-block",
    padding: "8px 20px",
    background: "rgba(5, 150, 105, 0.1)",
    color: "#059669",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "20px",
    letterSpacing: "1px",
  },
  sectionTitle: {
    fontSize: "clamp(32px, 6vw, 56px)",
    fontWeight: "800",
    lineHeight: "1.2",
    color: "#1F2937",
    marginBottom: "20px",
  },
  sectionSubtitle: {
    fontSize: "18px",
    color: "#6B7280",
    maxWidth: "600px",
    margin: "0 auto",
  },
  featuresGrid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
  },
  featureCard: {
    background: "white",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
  },
  featureIcon: {
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
    boxShadow: "0 8px 20px rgba(5, 150, 105, 0.2)",
  },
  featureEmoji: {
    fontSize: "32px",
  },
  featureTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: "12px",
  },
  featureDesc: {
    fontSize: "16px",
    color: "#6B7280",
    lineHeight: "1.6",
  },
  ctaSection: {
    position: "relative",
    zIndex: 1,
    padding: "100px 20px",
    background: "linear-gradient(135deg, #059669, #0891b2)",
    marginTop: "50px",
  },
  ctaContent: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "clamp(32px, 6vw, 48px)",
    fontWeight: "800",
    color: "white",
    marginBottom: "20px",
  },
  ctaSubtitle: {
    fontSize: "20px",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "40px",
  },
  ctaPrimaryBtn: {
    padding: "18px 50px",
    background: "white",
    color: "#059669",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s",
  },
  ctaSecondaryBtn: {
    padding: "18px 50px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  footer: {
    padding: "40px 20px",
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  footerLogoIcon: {
    width: "28px",
    height: "28px",
    color: "#059669",
  },
  footerLogoText: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1F2937",
  },
  footerText: {
    fontSize: "14px",
    color: "#6B7280",
  },
};

export default HomePage;