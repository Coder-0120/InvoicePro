import React, { useEffect, useState } from 'react';
import { Building2, Phone, MapPin, FileText, Percent, User } from 'lucide-react';
import axios from 'axios';

const Business = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessOwner: '',
    Address: '',
    contactNo: '',
    gstNumber: '',
    cgst: '',
    sgst: ''
  });
  const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const  userId = userInfo.userInfo.userId;

  useEffect(()=>{
    console.log("Fetching business details for userID:", userId);
    const fetchBusiness=async()=>{
      try{
        const res=await axios.get(`http://localhost:5000/api/business/my/${userId}`);
        
        if(!res){
          console.log("No business details found");
        }
        return setFormData({
          businessName:res.data.business.businessName,
          businessOwner:res.data.business.businessOwner,
          Address:res.data.business.Address,
          contactNo:res.data.business.contactNo,
          gstNumber:res.data.business.gstNumber,
          cgst:res.data.business.tax.cgst,
          sgst:res.data.business.tax.sgst
        })
      }
      catch(error){
        console.log("Error fetching business details");
      }
    }
    fetchBusiness();
  },[userId]);


  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) newErrors.businessName = 'Required';
    if (!formData.Address.trim()) newErrors.Address = 'Required';
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Required';
    } else if (!/^[0-9]{10}$/.test(formData.contactNo)) {
      newErrors.contactNo = 'Must be 10 digits';
    }
    if (!formData.gstNumber.trim()) newErrors.gstNumber = 'Required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/business/create", {
        userId: userId,
        businessName: formData.businessName,
        businessOwner: formData.businessOwner,
        Address: formData.Address,
        contactNo: formData.contactNo,
        gstNumber: formData.gstNumber,
        tax: {
          cgst: formData.cgst ? parseFloat(formData.cgst) : 0,
          sgst: formData.sgst ? parseFloat(formData.sgst) : 0
        }
      });

      alert(res.data.message);
      handleReset();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save business details');
    }
  };

  const handleReset = () => {
    setFormData({
      businessName: '',
      businessOwner: '',
      Address: '',
      contactNo: '',
      gstNumber: '',
      cgst: '',
      sgst: ''
    });
    setErrors({});
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <Building2 size={40} color="#10b981" />
          <h1 style={styles.title}>Business Details</h1>
        </div>

        <div style={styles.card}>
          <div style={styles.form}>
            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Business Name *</label>
                <input
                  style={errors.businessName ? styles.inputError : styles.input}
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  placeholder="Enter business name"
                />
                {errors.businessName && <span style={styles.error}>{errors.businessName}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Business Owner *</label>
                <input
                  style={errors.businessOwner ? styles.inputError : styles.input}
                  value={formData.businessOwner}
                  onChange={(e)=>handleChange('businessOwner',e.target.value)}
                  placeholder="Enter owner name"
                />
                {errors.businessOwner && <span style={styles.error}>{errors.businessOwner}</span>}
              </div>
            </div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>Contact Number *</label>
                <input
                  style={errors.contactNo ? styles.inputError : styles.input}
                  value={formData.contactNo}
                  onChange={(e) => handleChange('contactNo', e.target.value)}
                  placeholder="10 digit number"
                />
                {errors.contactNo && <span style={styles.error}>{errors.contactNo}</span>}
              </div>

              <div style={styles.field}>
                <label style={styles.label}>GST Number *</label>
                <input
                  style={errors.gstNumber ? styles.inputError : styles.input}
                  value={formData.gstNumber}
                  onChange={(e) => handleChange('gstNumber', e.target.value)}
                  placeholder="22AAAAA0000A1Z5"
                />
                {errors.gstNumber && <span style={styles.error}>{errors.gstNumber}</span>}
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Address *</label>
              <textarea
                rows="3"
                style={errors.Address ? styles.textareaError : styles.textarea}
                value={formData.Address}
                onChange={(e) => handleChange('Address', e.target.value)}
                placeholder="Enter complete address"
              />
              {errors.Address && <span style={styles.error}>{errors.Address}</span>}
            </div>

            <div style={styles.divider}>Tax Details</div>

            <div style={styles.row}>
              <div style={styles.field}>
                <label style={styles.label}>CGST (%)</label>
                <input
                  type="number"
                  style={styles.input}
                  value={formData.cgst}
                  onChange={(e) => handleChange('cgst', e.target.value)}
                  placeholder="9"
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>SGST (%)</label>
                <input
                  type="number"
                  style={styles.input}
                  value={formData.sgst}
                  onChange={(e) => handleChange('sgst', e.target.value)}
                  placeholder="9"
                />
              </div>
            </div>

            <div style={styles.buttons}>
              <button onClick={handleSubmit} style={styles.saveBtn}>
                Save Details
              </button>
              <button onClick={handleReset} style={styles.resetBtn}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f1f5f9',
    padding: '24px',
    fontFamily: 'system-ui, sans-serif'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1e293b',
    margin: '8px 0'
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '32px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#334155'
  },
  input: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none'
  },
  inputError: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '2px solid #ef4444',
    borderRadius: '8px',
    outline: 'none'
  },
  textarea: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  textareaError: {
    padding: '10px 12px',
    fontSize: '14px',
    border: '2px solid #ef4444',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  error: {
    fontSize: '13px',
    color: '#ef4444'
  },
  divider: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#10b981',
    marginTop: '8px',
    paddingBottom: '8px',
    borderBottom: '2px solid #e2e8f0'
  },
  buttons: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  saveBtn: {
    flex: 1,
    padding: '12px',
    background: '#10b981',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  resetBtn: {
    padding: '12px 24px',
    background: '#fff',
    color: '#64748b',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default Business;