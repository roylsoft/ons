import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';



function Addattendance() {

    const [speciality, setSpeciality] = useState([]);
    const [staff, setstaff] = useState([]);
    const [success, setsuccess] = useState("");
    const { mat } = useParams()
    const [values, setValues] = useState({
        branch: "",
        lecturer: "",
        day: "",
        period: "",
        code: "",
        spec: "",
        level: "",
        hour: "",
        sign: mat,
        pass: ""
    })
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        if (!values.branch) {
            newErrors.branch = 'branch is required';
        }
        if (!values.lecturer) {
            newErrors.lecturer = 'lecturer is required';
        }
        if (!values.code) {
            newErrors.code = 'code is required';
        }
        if (!values.lecturer) {
            newErrors.lecturer = 'lecturer is required';
        }
        if (!values.period) {
            newErrors.period = 'period is required';
        }
        if (!values.hour) {
            newErrors.hour = 'hour is required';
        }
        if (!values.day) {
            newErrors.day = 'day is required';
        }
        if (!values.spec) {
            newErrors.spec = 'spec is required';
        }
        if (!values.level) {
            newErrors.level = 'level is required';
        }
        if (!values.sign) {
            newErrors.sign = 'sign is required';
        }
        if (!values.pass) {
            newErrors.pass = 'Password is required';

        } else if (values.pass.length < 8) {
            newErrors.cpass = 'Password must be at least 8 characters long';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.post('http://localhost:3001/auth/addattendance', values)
                .then(result => {
                    if (result.data.createStatus) {
                        setsuccess(result.data.success)
                        window.location.reload()
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }


    useEffect(() => {
        axios.get('http://localhost:3001/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {

                    setSpeciality(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3001/auth/staff')
            .then(result => {
                if (result.data.readingStatus) {
                    console.log(result);
                    setstaff(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    let navigate = useNavigate()
    const handlelogout = () => {
        axios.get('http://localhost:3001/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    navigate('/')
                }
            })
    }

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center mb-4 align-items-center'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Add addattendance</h2> <br />
                    <div className='text-danger'>
                        {success && success}
                    </div>
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="branch"><strong>Branch<span className='start'>*</span></strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, branch: e.target.value })}
                                name='branch' autoComplete='off' placeholder='choose your branch' className='form-control rounded-2'>
                                <option value="">-- Select  the Branch--</option>
                                <option value="Madagascar">Madagascar(Main)</option>
                                <option value="Odza">Odza</option>
                                <option value="Olembe">Olembe</option>
                                <option value="Ngousso">Ngousso</option>
                                <option value="Bafia">Bafia</option>
                                <option value="Maroua">Maroua</option>
                                <option value="Foumbot">Foumbot</option>
                                <option value="Nkambe">Nkambe</option>
                                <option value="Douala">Douala</option>
                            </select>
                            {errors.branch && <div className="error-message">{errors.branch}</div>}
                            <label htmlFor="lecturer" className='form-label'>Select a lecturer:</label>
                            <select type='select' name="lecturer"
                                onChange={(e) => setValues({ ...values, lecturer: e.target.value })}

                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                {staff.map(sp => (
                                    <option key={sp.mat} value={sp.mat}>{sp.name}</option>
                                ))}
                            </select>
                            {errors.spec && <div className="error-message">{errors.lecturer}</div>}
                            <label htmlFor="day"><strong>day:</strong></label>
                            <input type="date" onChange={(e) => setValues({ ...values, day: e.target.value })}
                                name='day' placeholder=''
                                className='form-control rounded-0' />
                            {errors.day && <div className="error-message">{errors.day}</div>}
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="period"><strong>period:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, period: e.target.value })}
                                name='period' placeholder='Teaching period'
                                className='form-control rounded-0' />
                            {errors.period && <div className="error-message">{errors.period}</div>}
                            <label htmlFor="code"><strong>course code :</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, code: e.target.value })}
                                name='code' autoComplete='off' placeholder='Course code'
                                className='form-control rounded-0' />
                            {errors.code && <div className="error-message">{errors.code}</div>}
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="speciality" className='form-label'>Select a speciality:</label>
                            <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })}

                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                {speciality.map(sp => (
                                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                                ))}
                            </select>
                            {errors.spec && <div className="error-message">{errors.spec}</div>}
                            <label htmlFor="level"><strong>Level:</strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, level: e.target.value })}
                                name='level' autoComplete='off' placeholder='choose your level'
                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                            {errors.level && <div className="error-message">{errors.level}</div>}
                        </div>


                        <div className='mb-3 form-group'>
                            <label htmlFor="hour"><strong>hour :</strong></label>
                            <input type="number" onChange={(e) => setValues({ ...values, hour: e.target.value })}
                                name='hour' autoComplete='off' placeholder='Total hours'
                                className='form-control rounded-0' />
                            {errors.hour && <div className="error-message">{errors.hour}</div>}
                            <label htmlFor="pass"><strong>Your admin password:</strong></label>
                            <input type="password" onChange={(e) => setValues({ ...values, pass: e.target.value })}
                                name='pass' placeholder='Enter your admin password'
                                className='form-control rounded-0' />
                            {errors.pass && <div className="error-message">{errors.pass}</div>}
                        </div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <button type='submit' className='secondary-button mx-2 round-0 mb-2'>Create</button>
                            <button className='secondary-button btn-warning w-40 mx-2 round-0 mb-2' onClick={handlelogout}>Logout</button>
                        </div>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Addattendance