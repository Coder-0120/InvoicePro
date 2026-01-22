# 🧾📊 InvoicePro – Smart Invoice Management System 💼✨

**InvoicePro** is a secure, modern, and responsive **invoice creation & tracking web application** designed for small businesses and professionals.  
It allows users to create, manage, track, and analyze invoices with instant tax calculations and a controlled invoice lifecycle — all from one dashboard.
<img width="1897" height="1080" alt="Screenshot (103)" src="https://github.com/user-attachments/assets/59f0b425-01d5-4621-aa97-09f1e66d810c" />


---

## 🌟 What is InvoicePro?

**InvoicePro** helps businesses manage invoices efficiently by providing:
- Draft-based invoice creation  
- Status-controlled invoice workflow  
- Automatic tax calculations  
- Downloadable professional invoice PDFs  
- Real-time analytics dashboard  

It ensures **accuracy, security, and consistency** throughout the invoicing process.

---

## 🚀 Key Features

### 🔐 Authentication & Security
🔑 Secure Login & Signup  
🔒 Password hashing & JWT authentication  
👤 Profile update (Name editable, Email fixed)  
🛡️ Protected routes  

---

### 🏢 Business Management
🏷️ One-time business setup  
📄 Business details stored securely  
🚫 GST Number immutable once set  
✏️ Business details editable anytime (except GST)  

---

### 🧾 Invoice Lifecycle Management
📝 Create invoice as **Draft**  
🟡 Finalize → auto-generates invoice number & marks as **Unpaid**  
❌ Cancel invoice (only when Unpaid)  
✅ Mark invoice as **Paid** (only from Unpaid state)  
🔐 Strict status-based validations  

---

### 💰 Instant Tax & Total Calculation
⚡ Automatic CGST & SGST calculation  
📊 Real-time subtotal, tax & grand total  
🧮 Accurate totals even after invoice updates  

---

### 📥 Invoice PDF Download
📄 Download professional invoice as PDF  
🖨️ Print-ready layout  
🗂️ Business snapshot preserved per invoice  

---

### 🔍 Invoice Filters
📌 Filter invoices by status:
- 📝 Draft  
- 💛 Unpaid  
- ✅ Paid  
- ❌ Cancelled  

---

### 📊 Dashboard Analytics
📈 Total invoices overview  
📊 Percentage distribution of:
- Paid  
- Unpaid  
- Draft  
- Cancelled  

---

### 🔔 Alerts & Feedback
🎉 Toast notifications for actions  
⚠️ Success & error alerts  
💡 Better user experience  

---

### 📱 Responsive Design
📱 Mobile-friendly  
💻 Works on all screen sizes  
🎨 Clean and professional UI  

---

## 🛠️ Tech Stack

🖥️ Frontend: React.js  
⚙️ Backend: Node.js, Express.js  
🗄️ Database: MongoDB  
🔐 Authentication: JWT  
📄 PDF Generation: PDFKit  
🔔 Alerts: React-Toastify  

---

## ⚡ Getting Started

### 🔽 Clone Repository
```bash
git clone https://github.com/Coder-0120/Invoice_App.git
cd InvoicePro

```
Install backend dependencies
```bash
cd server
npm install
```

Install frontend dependencies
```bash
cd client
npm install
```

Create a .env file in the root directory:  
- PORT=5000  
- MONGO_URI=your_mongodb_connection_string

Run the development server
```bash
npm run dev
```
Frontend will run at http://localhost:3000  
Backend will run at http://localhost:5000
