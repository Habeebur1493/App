import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    toast.success("Product deleted successfully");
  };

  return (
    <div>
      {/* Responsive Navbar */}
      <nav className="navbar navbar-expand-lg bg-primary p-3 text-white">
        <div className="container">
          <h1 className="navbar-brand text-white" style={{ fontSize: "24px" }}>Logo</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/">Services</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/">About</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/">Contact</Link></li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-light text-primary me-2">Search</button>
              <Link to="/" className="btn btn-danger" onClick={() => toast.success("Logout successful")}>Logout</Link  >
              


            </div>
          </div>
        </div>
      </nav>

      {/* Add Product Button */}
      <div className="container mt-4 text-end">
        <Link to="/add-product">
          <button className="btn btn-success">Add Product</button>
        </Link>
      </div>

      {/* Product List */}
      <div className="container mt-4">
        {products.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-muted">No products found</h4>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {products.map((product, index) => (
              <div key={index} className="col">
                <div className="card shadow-sm p-2 text-center">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "180px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="card-text text-primary">${product.price}</p>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <Link to={`/edit-product/${index}`} className="btn btn-primary">
                        Edit
                      </Link>
                      <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                      <Link to={`/view/${index}`} className="btn btn-secondary">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
