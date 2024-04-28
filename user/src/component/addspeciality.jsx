import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Addspeciality() {

    const [values, setValues] = useState({
        codesp: "",
        title: "",
        codep: ""
    })
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        if (!values.codesp) {
            newErrors.codesp = 'code is required';
        }
        if (!values.title) {
            newErrors.title = 'title is required';
        }
        if (!values.codep) {
            newErrors.codep = 'department required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const [department, setDepartement] = useState([]);
    const Navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.post('http://localhost:3000/auth/addspeciality', values)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        Navigate('/specialities')
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }
    useEffect(() => {
        axios.get('http://localhost:3000/auth/department')
            .then(result => {
                if (result.data.readingStatus) {
                    setDepartement(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                <div className='p-3 rounded w-60 border loginForm'>

                    <h2>Add a new speciality</h2> <br />
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="codesp"><strong>Speciality code:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, codesp: e.target.value })}
                                name='codesp' autoComplete='off' placeholder='Enter your matricule'
                                className='form-control rounded-0' />
                            {errors.codesp && <div className="error-message">{errors.codesp}</div>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="title"><strong>Name:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, title: e.target.value })}
                                name='title' placeholder='Enter your password'
                                className='form-control rounded-0' />
                            {errors.title && <div className="error-message">{errors.title}</div>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="codep" className='form-label'>Select a department:</label>
                            <select type='select' name="codep" onChange={(e) => setValues({ ...values, codep: e.target.value })}

                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                {department.map(dp => (
                                    <option key={dp.codep} value={dp.codep}>{dp.title}</option>
                                ))}
                            </select>
                            {errors.codep && <div className="error-message">{errors.codep}</div>}
                        </div>
                        <button type='submit' className='btn btn-success w-100 round-5 mb-2'>Create</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Addspeciality