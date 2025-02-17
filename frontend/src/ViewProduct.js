import React from "react";
import { useParams } from "react-router-dom";

function ViewProduct() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[id];

  if (!product) {
    return <h2 className="text-center mt-5">Product Not Found</h2>;
  }

  return (
    <div className="container mt-5 text-center">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
      <h4 className="text-primary mt-3">${product.price}</h4>
      <p>{product.description}</p>
    </div>
  );
}

export default ViewProduct;
