import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";
import AddProduct from "./AddProduct"; // Import the new component

function App() {
  const [products, setProducts] = useState([]);
  const [lang, setLang] = useState("en");
  const [token, setToken] = useState(null);

  // Put the fetch in a function so we can call it again
  const fetchProducts = () => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Smart Retail Inventory</h1>
      
      <div>
        <button onClick={() => setLang("en")}>English</button>
        <button onClick={() => setLang("ta")}>தமிழ்</button>
      </div>

      {token ? (
        <>
          <Dashboard products={products} lang={lang} />
          <AddProduct onProductAdded={fetchProducts} /> 
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
}

export default App;