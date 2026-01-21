import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDraftInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  // ================= FETCH INVOICE =================
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invoice/my/${id}`);

        if (res.data.invoice.status !== "draft") {
          alert("Only draft invoices can be edited");
          navigate("/invoices");
          return;
        }

        setCustomer(res.data.invoice.customer);
        setItems(res.data.invoice.items);
        setLoading(false);
      } catch (error) {
        alert("Failed to load invoice");
        navigate("/invoices");
      }
    };

    fetchInvoice();
  }, [id, navigate]);

  // ================= ITEM UPDATE =================
  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", price: 0, quantity: 1 }
    ]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // ================= UPDATE DRAFT =================
  const updateDraftInvoice = async () => {
    try {
      await axios.put(`http://localhost:5000/api/invoice/${id}`, {
        customer,
        items
      });

      alert("Draft invoice updated successfully");
      navigate("/invoices");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="invoice-edit">

      <h2>Edit Draft Invoice</h2>

      {/* ===== CUSTOMER ===== */}
      <h4>Customer</h4>
      <input
        placeholder="Customer Name"
        value={customer.name}
        onChange={e =>
          setCustomer({ ...customer, name: e.target.value })
        }
      />

      <input
        placeholder="Phone"
        value={customer.phone}
        onChange={e =>
          setCustomer({ ...customer, phone: e.target.value })
        }
      />

      <textarea
        placeholder="Address"
        value={customer.address}
        onChange={e =>
          setCustomer({ ...customer, address: e.target.value })
        }
      />

      {/* ===== ITEMS ===== */}
      <h4>Items</h4>

      {items.map((item, index) => (
        <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
          <input
            placeholder="Item Name"
            value={item.itemName}
            onChange={e => updateItem(index, "itemName", e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={e => updateItem(index, "price", Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Qty"
            value={item.quantity}
            onChange={e => updateItem(index, "quantity", Number(e.target.value))}
          />

          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}

      <button onClick={addItem}>Add Item</button>

      {/* ===== ACTIONS ===== */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={updateDraftInvoice}>
          Save Draft
        </button>

        <button onClick={() => navigate("/invoices")}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditDraftInvoice;
