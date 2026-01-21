import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
   useEffect(() => {
    const fetchProfile=async()=>{
        try{
            const res=await axios.get(`http://localhost:5000/api/user/profile/${userInfo.userInfo.userId}`);
            setProfileData({...profileData,name:res.data.user.name,email:res.data.user.email});

        }
        catch(error){
            console.log(error);
        }
    }
    fetchProfile();

   
  }, []); 
  
  


  // TODO: Fetch user profile from backend
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const res = await axios.get("http://localhost:5000/api/user/profile");
  //     setProfileData({...profileData, name: res.data.name, email: res.data.email});
  //   };
  //   fetchProfile();
  // }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try{
        const res=await axios.put(`http://localhost:5000/api/user/update/${userInfo.userInfo.userId}`,{
            name:profileData.name
        });
        alert("Profile updated successfully");
        localStorage.setItem("UserInfo",JSON.stringify({
            userId:userInfo.userInfo.userId,
            name:profileData.name,
            email:profileData.email
        }));

    }
    catch(error){
        console.log(error);
        alert("Error in updating profile");
    }
  };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     if (profileData.newPassword !== profileData.confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }
//     // TODO: Add backend API call to change password
//     // try {
//     //   const res = await axios.put("http://localhost:5000/api/user/change-password", {
//     //     currentPassword: profileData.currentPassword,
//     //     newPassword: profileData.newPassword
//     //   });
//     //   alert('Password changed successfully!');
//     //   setProfileData({...profileData, currentPassword: '', newPassword: '', confirmPassword: ''});
//     // } catch (error) {
//     //   console.error(error);
//     //   alert('Failed to change password');
//     // }
    
//     alert('Password changed successfully!');
//     setProfileData({...profileData, currentPassword: '', newPassword: '', confirmPassword: ''});
//   };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>Profile Settings</h1>
      <p style={styles.pageSubtitle}>Manage your account information</p>

      {/* Profile Information */}
      <form onSubmit={handleUpdateProfile} style={styles.form}>
        <div style={styles.formSection}>
          <h3 style={styles.formSectionTitle}>Profile Information</h3>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name *</label>
              <input
                type="text"
                required
                style={styles.input}
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email *</label>
              <input
                type="email"
                required
                style={styles.input}
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                placeholder="john@example.com"
              />
            </div>
          </div>
          <button type="submit" style={styles.submitBtn}>
            Update Profile
          </button>
        </div>
      </form>

      {/* Change Password */}
      {/* <form onSubmit={handleChangePassword} style={{...styles.form, marginTop: '32px'}}>
        <div style={styles.formSection}>
          <h3 style={styles.formSectionTitle}>Change Password</h3>
          <div style={styles.formGroup}>
            <label style={styles.label}>Current Password *</label>
            <input
              type="password"
              required
              style={styles.input}
              value={profileData.currentPassword}
              onChange={(e) => setProfileData({...profileData, currentPassword: e.target.value})}
              placeholder="Enter current password"
            />
          </div>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>New Password *</label>
              <input
                type="password"
                required
                style={styles.input}
                value={profileData.newPassword}
                onChange={(e) => setProfileData({...profileData, newPassword: e.target.value})}
                placeholder="Enter new password"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password *</label>
              <input
                type="password"
                required
                style={styles.input}
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({...profileData, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <button type="submit" style={styles.submitBtn}>
            Change Password
          </button>
        </div>
      </form> */}
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: '8px',
  },
  pageSubtitle: {
    fontSize: '16px',
    color: '#6B7280',
    marginBottom: '32px',
  },
  form: {
    background: '#fff',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
  },
  formSection: {
    marginBottom: 0,
  },
  formSectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: '16px',
    marginTop: 0,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(to right, #059669, #0891b2)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '16px',
    transition: 'transform 0.2s',
  },
};

export default Profile;