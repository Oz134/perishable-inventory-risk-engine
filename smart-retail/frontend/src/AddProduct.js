import React, { useState } from "react";

function AddProduct({ onProductAdded }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, quantity: Number(quantity), expiry })
    });

    if (res.ok) {
      alert("Product added!");
      setName(""); setQuantity(""); setExpiry("");
      onProductAdded(); // This refreshes the list
    }
  };

  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
      <h3>Add New Inventory</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder="Item Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Qty" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        <input type="date" value={expiry} onChange={e => setExpiry(e.target.value)} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;