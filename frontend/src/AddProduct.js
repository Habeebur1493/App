import React from "react";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";

function AddProduct() {
  return (
    <div className="container mt-5">
      <h2>Add New Product</h2>
      <ProductForm handleSubmit={(e) => toast.success("Product saved successfully")} />
      
    </div>
  );
}

export default AddProduct;
