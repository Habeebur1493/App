import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import validation from './SignupValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [values, setvalues] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const [errors, seterrors] = useState({})
    const handleInput = (event) => {
        setvalues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        seterrors(validation(values));
        if(errors.name ==="" && errors.email ==="" && errors.password ===""){
            axios.post('http://localhost:3001/signup', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
            }

    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign-Up</h2>
            <form action="" onSubmit={handleSubmit}>
            <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type="text" placeholder='Enter your name' name='name'
                   onChange={handleInput}  className='form-control rounded-0'/>
                    <span>{errors.name && <span className='text-danger' >{errors.name}</span>}</span>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter your email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                     <span>{errors.email && <span className='text-danger' >{errors.email}</span>}</span>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter your password' name='password' 
                    onChange={handleInput} className='form-control rounded-0'/>
                    <span>{errors.password && <span className='text-danger' >{errors.password}</span>}</span>
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Signup</strong></button>
                <p>Already have an account?</p>
                <Link to="/" className='btn btn-default border w-100 rounded-0 bg-light text-decoration-none'><strong>Login</strong></Link>
            </form>
        </div>
    </div>
  )
}

export default Signup