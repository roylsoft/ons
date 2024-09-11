import React, { useState } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from "react-router-dom";

const Loginbank = () => {
    const [values, setValues] = useState({
        caisse: "",
        password: ""
    })
    const { Matricule } = useParams()
    const [error, setError] = useState(null)
    const Navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3001/auth/logintobank', values)
            .then(result => {
                if (result.data.loginStatus) {
                    Navigate('/frombanker.jsx')
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded w-60 border loginForm'>

                <h2>Log In</h2> <br />
                <div className='text-danger'>
                    {error && error}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="caisse"><strong>Checkout:</strong></label>
                        <input type="text" onChange={(e) => setValues({ ...values, caisse: e.target.value })} name='caisse' autoComplete='off' placeholder='Numero de caisse' className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="text" onChange={(e) => setValues({ ...values, password: e.target.value })} name='password' placeholder='Enter your password' className='form-control rounded-0' />
                    </div>
                    <button className='secondary-button w-100 mb-2'>Log In</button>

                    <div className='mb-1'>
                        <input type="checkbox" name='tick' id='tick' onChange={(e) => setValues({ ...values, tick: e.target.value })} className='ms-2' />
                    </div>
                </form>
            </div>

        </div>

    )
}

export default Loginbank