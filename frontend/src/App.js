import React from 'react'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Home from './Home'
import ViewProduct from "./ViewProduct";
import AddProduct from "./AddProduct";
import ProductForm from "./ProductForm";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/view/:id" element={<ViewProduct />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<ProductForm />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App