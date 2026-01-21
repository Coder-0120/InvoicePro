import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register_User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const navigate=useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
        await axios.post(`http://localhost:5000/api/user/register`,{
            name,email,password
        });
        alert("User Registered successfully..");
        navigate("/login");
        setName("");
        setEmail("");
        setPassword("");
    }
    catch(error){
        console.log(error);
        alert("failed to register new user");
    }
  };

  return (
    <div style={styles.container}>
      {/* Decorative background blobs */}
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>
      <div style={styles.blob3}></div>

      <div style={styles.wrapper}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <div style={styles.logoBox}>
            <svg style={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 style={styles.brandName}>InvoicePro</h1>
          <p style={styles.brandTagline}>Professional invoice management made simple</p>
        </div>

        {/* Registration Card */}
        <div style={styles.card}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join thousands managing invoices efficiently</p>

          <div style={styles.formContainer}>
            {/* Name Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <svg style={{...styles.icon, color: focusedField === 'name' ? '#059669' : '#9CA3AF'}} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'name' ? '#10B981' : '#E5E7EB',
                    boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none',
                    transform: focusedField === 'name' ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <svg style={{...styles.icon, color: focusedField === 'email' ? '#059669' : '#9CA3AF'}} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'email' ? '#10B981' : '#E5E7EB',
                    boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none',
                    transform: focusedField === 'email' ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <svg style={{...styles.icon, color: focusedField === 'password' ? '#059669' : '#9CA3AF'}} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'password' ? '#10B981' : '#E5E7EB',
                    boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(16, 185, 129, 0.1)' : 'none',
                    transform: focusedField === 'password' ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
              <p style={styles.hint}>Must be at least 4 characters long</p>
            </div>

            {/* Submit Button */}
            <button onClick={handleSubmit} style={styles.button} onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #047857, #0891b2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, #059669, #0891b2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
            }}>
              Create Account
              <svg style={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Login Link */}
          <p style={styles.footerText}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Sign in
            </a>
          </p>
        </div>

        {/* Terms */}
        <p style={styles.termsText}>
          By creating an account, you agree to our{" "}
          <button style={styles.termsLink}>Terms of Service</button>
          {" "}and{" "}
          <button style={styles.termsLink}>Privacy Policy</button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ecfdf5 0%, #cffafe 50%, #dbeafe 100%)",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    top: "80px",
    left: "40px",
    width: "288px",
    height: "288px",
    background: "#a7f3d0",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 0.3,
    animation: "pulse 3s infinite",
  },
  blob2: {
    position: "absolute",
    top: "160px",
    right: "80px",
    width: "256px",
    height: "256px",
    background: "#a5f3fc",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 0.3,
    animation: "pulse 3s infinite 0.5s",
  },
  blob3: {
    position: "absolute",
    bottom: "80px",
    right: "40px",
    width: "288px",
    height: "288px",
    background: "#bfdbfe",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 0.3,
    animation: "pulse 3s infinite 1s",
  },
  wrapper: {
    width: "100%",
    maxWidth: "448px",
    position: "relative",
    zIndex: 1,
  },
  logoSection: {
    textAlign: "center",
    marginBottom: "32px",
  },
  logoBox: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "64px",
    height: "64px",
    background: "linear-gradient(135deg, #059669, #0891b2)",
    borderRadius: "16px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    marginBottom: "16px",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  logoIcon: {
    width: "32px",
    height: "32px",
    color: "white",
  },
  brandName: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#1F2937",
    margin: "0 0 8px 0",
  },
  brandTagline: {
    fontSize: "15px",
    color: "#6B7280",
    margin: 0,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    border: "1px solid #F3F4F6",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: "24px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "8px",
  },
  inputWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    transition: "color 0.2s",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 44px",
    fontSize: "14px",
    borderRadius: "12px",
    border: "2px solid",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box",
  },
  hint: {
    fontSize: "12px",
    color: "#6B7280",
    marginTop: "8px",
  },
  button: {
    width: "100%",
    padding: "12px 16px",
    background: "linear-gradient(to right, #059669, #0891b2)",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: "all 0.2s",
  },
  buttonIcon: {
    width: "20px",
    height: "20px",
  },
  footerText: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#6B7280",
  },
  link: {
    color: "#059669",
    textDecoration: "none",
    fontWeight: "600",
  },
  termsText: {
    textAlign: "center",
    fontSize: "12px",
    color: "#6B7280",
    marginTop: "24px",
    padding: "0 16px",
  },
  termsLink: {
    color: "#059669",
    background: "none",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
    padding: 0,
    font: "inherit",
  },
};

export default Register_User;