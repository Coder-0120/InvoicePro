import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register_User from './Pages/Register_User';
import Dashboard from './Pages/Dashboard';
import CreateInvoice from './Pages/CreateInvoice';
import Invoices from './Pages/Invoices';
import Business from './Pages/Business';
import Profile from './Pages/Profile';
import DashboardLayout from './Components/DashboardLayout';
import EditDraftInvoice from './Pages/EditDraftInvoice';
import InvoicePreview from './Pages/InvoicePreview';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("UserInfo"); 
  return isLoggedIn ? children : <Navigate to="/home" />;
};

function App() {
  return (
   <>
     <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
   <Router>
    <Routes>
      {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register_User />} /> {/* Create Register component similar to Login */}
        <Route path="/home" element={<HomePage />} /> {/* Create Register component similar to Login */}
        
        {/* Protected Routes with Sidebar */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
        <Route path="/create-invoice" element={<ProtectedRoute><DashboardLayout><CreateInvoice /></DashboardLayout></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><DashboardLayout><Invoices /></DashboardLayout></ProtectedRoute>} />
        <Route path="/business" element={<ProtectedRoute><DashboardLayout><Business /></DashboardLayout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
        <Route path="/invoice/edit/:id" element={<ProtectedRoute><DashboardLayout><EditDraftInvoice /></DashboardLayout></ProtectedRoute>} />
        <Route path="/invoice/view/:id" element={<DashboardLayout><InvoicePreview /></DashboardLayout>} />

        
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/home" element={<Navigate to="/home" replace />} />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
   </Router>
   </>
  );
}

export default App;
