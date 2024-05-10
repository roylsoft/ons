import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Addbanker() {

    const [values, setValues] = useState({
        caisse: "",
        password: ""
       
    })
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        if (!values.caisse) {
            newErrors.caisse = 'checkout number is required';
        }
        if (!values.password) {
            newErrors.password = 'password is required';
        }
        

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

  
    const Navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.post('https://ons-client.vercel.app/auth/addbanker', values)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        Navigate('/solvability')
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }
   
    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                <div className='p-3 rounded w-60 border loginForm'>

                    <h2>Add a new banker</h2> <br />
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="caisse"><strong>Checkout number:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, caisse: e.target.value })}
                                name='caisse' autoComplete='off' placeholder='Numero de caisse'
                                className='form-control rounded-0' />
                            {errors.caisse && <div className="error-message">{errors.caisse}</div>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>Password:</strong></label>
                            <input type="password" onChange={(e) => setValues({ ...values, password: e.target.value })}
                                name='password' placeholder='Enter the password'
                                className='form-control rounded-0' />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                       
                        <button type ="submit" className='btn btn-success w-100 round-5 mb-2'>Create</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Addbanker