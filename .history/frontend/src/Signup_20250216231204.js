import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
    const [values, setValues] = useState({
        name: "",
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
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3001/signup', values)
                .then(res => {
                    navigate('/');
                    toast.success("Signup successful");
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-4 rounded w-100 shadow-sm' style={{ maxWidth: '400px' }}>
                <h2 className='text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input 
                            type='text' 
                            placeholder='Enter your name' 
                            name='name'
                            onChange={handleInput} 
                            className='form-control rounded-0' 
                        />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input 
                            type='email' 
                            placeholder='Enter your email' 
                            name='email'
                            onChange={handleInput} 
                            className='form-control rounded-0' 
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
                            className='form-control rounded-0' 
                        />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Signup</strong></button>
                    <p className='text-center mt-2'>Already have an account?</p>
                    <Link to='/' className='btn btn-light border w-100 rounded-0 text-decoration-none'>
                        <strong>Login</strong>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;