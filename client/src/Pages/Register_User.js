import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, FileText } from 'lucide-react';
import toast from "react-hot-toast";
const API_URL = process.env.REACT_APP_API_URL;

const Register_User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await axios.post(`${API_URL}api/user/register`,{
            name,email,password
        });
        toast.success("User Registered successfully..");
        navigate("/login");
        setName("");
        setEmail("");
        setPassword("");
    }
    catch(error){
        console.log(error);
        toast.error("failed to register new user");
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
          <div style={styles.logoBox} onClick={() => window.location.href = "/home"}>
            <FileText size={32} color="white" />
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
                <User 
                  size={20} 
                  style={{
                    ...styles.icon, 
                    color: focusedField === 'name' ? '#059669' : '#9CA3AF'
                  }} 
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'name' ? '#059669' : '#E5E7EB',
                    boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(5, 150, 105, 0.1)' : 'none',
                    transform: focusedField === 'name' ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
            </div>

            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputWrapper}>
                <Mail 
                  size={20} 
                  style={{
                    ...styles.icon, 
                    color: focusedField === 'email' ? '#059669' : '#9CA3AF'
                  }} 
                />
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'email' ? '#059669' : '#E5E7EB',
                    boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(5, 150, 105, 0.1)' : 'none',
                    transform: focusedField === 'email' ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock 
                  size={20} 
                  style={{
                    ...styles.icon, 
                    color: focusedField === 'password' ? '#059669' : '#9CA3AF'
                  }} 
                />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  style={{
                    ...styles.input,
                    borderColor: focusedField === 'password' ? '#059669' : '#E5E7EB',
                    boxShadow: focusedField === 'password' ? '0 0 0 4px rgba(5, 150, 105, 0.1)' : 'none',
                    transform: focusedField === 'password' ? 'scale(1.02)' : 'scale(1)',
                  }}
                />
              </div>
              <p style={styles.hint}>Must be at least 4 characters long</p>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit} 
              style={styles.button} 
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #047857, #0e7490)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(5, 150, 105, 0.3)';
              }} 
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #059669, #0891b2)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(5, 150, 105, 0.2)';
              }}
            >
              Create Account
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
    background: "linear-gradient(to bottom, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  blob1: {
    position: "absolute",
    top: "-10%",
    left: "-5%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 1,
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    top: "30%",
    right: "-10%",
    width: "700px",
    height: "700px",
    background: "radial-gradient(circle, rgba(8, 145, 178, 0.12) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 1,
    pointerEvents: "none",
  },
  blob3: {
    position: "absolute",
    bottom: "-15%",
    left: "20%",
    width: "650px",
    height: "650px",
    background: "radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 1,
    pointerEvents: "none",
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
    boxShadow: "0 10px 30px rgba(5, 150, 105, 0.2)",
    marginBottom: "16px",
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  brandName: {
    fontSize: "30px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #059669, #0891b2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0 0 8px 0",
  },
  brandTagline: {
    fontSize: "15px",
    color: "#64748b",
    margin: 0,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "32px",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(5, 150, 105, 0.1)",
    border: "1px solid rgba(5, 150, 105, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
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
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: "8px",
  },
  inputWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    transition: "color 0.2s",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "12px 12px 12px 46px",
    fontSize: "14px",
    borderRadius: "12px",
    border: "2px solid",
    outline: "none",
    transition: "all 0.2s",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  hint: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "8px",
  },
  button: {
    width: "100%",
    padding: "14px 16px",
    background: "linear-gradient(135deg, #059669, #0891b2)",
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
    boxShadow: "0 10px 30px rgba(5, 150, 105, 0.2)",
    transition: "all 0.3s ease",
  },
  footerText: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "14px",
    color: "#64748b",
  },
  link: {
    color: "#059669",
    textDecoration: "none",
    fontWeight: "600",
  },
  termsText: {
    textAlign: "center",
    fontSize: "12px",
    color: "#64748b",
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
    fontWeight: "600",
  },
};

export default Register_User;