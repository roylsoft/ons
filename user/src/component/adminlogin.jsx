import React, { useState } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


const Adminlogin = () => {
    const [values, setValues] = useState({
        matricule: "",
        password: ""
    })
    
    const [error, setError] = useState(null)
    const Navigate = useNavigate()
    const [adminMat, setAdminMat] = useState("");

    axios.defaults.withCredentials = true
    // window.location.reload()
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(values);
        axios.post('http://localhost:3001/auth/adminlogin', values)
            .then(result => {
                if (result.data.loginStatus) {
                    const userRole = "admin";
                    localStorage.setItem('userRole', userRole);
                    sessionStorage.setItem('userRole', userRole);
                    setAdminMat(result.data.mat);
                    Navigate('/home/' + result.data.mat)
                    window.location.reload()
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
         <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='p-3 rounded w-60 border loginForm'>

                <h2>Log in to your account</h2> <br />
                <div className='text-danger'>
                    {error && error}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="matricule"><strong>Matricule:</strong></label>
                        <input type="text" onChange={(e) => setValues({ ...values, matricule: e.target.value })} name='matricule' autoComplete='off' placeholder='Enter your matricule' className='form-control rounded-3' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input type="text" onChange={(e) => setValues({ ...values, password: e.target.value })} name='password' placeholder='Enter your password' className='form-control rounded-3' />
                    </div>
                     <button className='secondary-button w-100 mb-2'>Log In</button>
                    <div className='mb-1'>
                        <input type="checkbox" name='tick' id='tick' onChange={(e) => setValues({ ...values, tick: e.target.value })} className='ms-2' />
                        <label htmlFor="terms"> You agree with our terms and conditions</label>

                    </div>
                </form>
            </div>
         </div>

    )
}

export default Adminlogin