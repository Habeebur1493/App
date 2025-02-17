import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Function to delete a product
  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar bg-primary p-3 text-white d-flex justify-content-between align-items-center">
        <h1 className="text-white" style={{ fontSize: "30px" }}>
          Logo
        </h1>
        <ul className="d-flex gap-3 list-unstyled m-0">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <input
          className="form-control w-25 m-0 p-2 text-black rounded bg-white text-center"
          type="text"
          placeholder="Search"
        />
        <button className="btn btn-primary text-white">Search</button>
        <Link to="/" className="btn btn-primary text-white ms-3">Logout</Link>
      </nav>

      {/* Button to Add Product */}
      <div className="container mt-4 text-end">
        <Link to="/add-product">
          <button className="btn btn-success">Add Product</button>
        </Link>
      </div>

      {/* Product List or No Products Message */}
      <div className="container mt-4">
        {products.length === 0 ? (
          <div className="text-center mt-5">
            <h4 className="text-muted">No products found</h4>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {products.map((product, index) => (
              <div key={index} className="col">
                <div className="card shadow-sm p-2 text-center">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{product.name}</h6>
                    <p className="card-text text-primary">{product.price}$</p>
                    <p className="card-text">{product.description}</p>
                    <Link
                      to={`/edit-product/${index}`}
                      className="btn btn-primary me-2"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-danger me-2"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>

                    <button className="btn btn-secondary">
                      <Link
                        to={`/view/${index}`}
                        className="text-white text-decoration-none"
                      >
                        View
                      </Link>
                    </button>
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
