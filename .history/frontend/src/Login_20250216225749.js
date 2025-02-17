import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:3001/login', values)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/home');
                    } else {
                        alert("No user found");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='row w-100 justify-content-center'>
                <div className='col-10 col-sm-8 col-md-6 col-lg-4 bg-white p-4 rounded shadow'>
                    <h2 className='text-center mb-4'>Sign-In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor='email'><strong>Email</strong></label>
                            <input 
                                type='email' 
                                placeholder='Enter your email' 
                                name='email' 
                                onChange={handleInput} 
                                className='form-control' 
                            />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='password'><strong>Password</strong></label>
                            <input 
                                type='password' 
                                placeholder='Enter your password' 
                                name='password' 
                                onChange={handleInput} 
                                className='form-control' 
                            />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <button type='submit' className='btn btn-success w-100'><strong>Login</strong></button>
                        <p className='text-center mt-3'>Don't have an account?</p>
                        <Link to='/signup' className='btn btn-outline-primary w-100 text-decoration-none'><strong>Create Account</strong></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
