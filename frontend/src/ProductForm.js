import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function ProductForm() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", price: "", description: "", image: "" });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    if (id !== undefined) {
      const existingProduct = savedProducts[id];
      if (existingProduct) setProduct(existingProduct);
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProducts = [...products];

    if (id !== undefined) {
      updatedProducts[id] = product; // Update existing product
    } else {
      updatedProducts.push(product); // Add new product
    }

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/home");
    toast.success("Product saved successfully"); 
     // Redirect to home
  };

  return (
    <div className="container mt-4">
      <h2>{id !== undefined ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="form-control mb-2"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">
          {id !== undefined ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
