import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom';



function Addattendance() {

    const [speciality, setSpeciality] = useState([]);
    const [staff, setstaff] = useState([]);
    const { mat } = useParams()
    const [values, setValues] = useState({
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
        if (!values.name) {
            newErrors.name = 'Name is required';
        }
        if (!values.grade) {
            newErrors.grade = 'grade is required';
        }
        if (!values.birth) {
            newErrors.birth = 'birth is required';
        }
        if (!values.idcard) {
            newErrors.idcard = 'idcard is required';
        }
        if (!values.place) {
            newErrors.place = 'Place is required';
        }
        if (!values.sex) {
            newErrors.sex = 'sex is required';
        }

        if (!values.email) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!values.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(values.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        if (!values.pass) {
            newErrors.pass = 'Password is required';

        } else if (values.cpass.length < 8) {
            newErrors.cpass = 'Password must be at least 8 characters long';
        }

        if (!values.pic) {
            newErrors.pic = 'Picture is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.post('http://localhost:3000/student/addattendance', values)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        setSuccess(result.data.Matricule)
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }


    useEffect(() => {
        axios.get('http://localhost:3000/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {
                    setSpeciality(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/staff/staff')
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
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    navigate('/')
                }
            })
    }

    return (
        <main className='main-container'>
            <div className='d-flex mx-3 justify-content-center mt-5 mb-4 align-items-center'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Add addattendance</h2> <br />
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="lecturer" className='form-label'>Select a lecturer:</label>
                            <select type='select' name="lecturer" onChange={(e) => setValues({ ...values, lecturer: e.target.value })}

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
                            <button className='btn btn-success w-40 mx-2 round-0 mb-2'>Create</button>
                            <button className='btn btn-warning w-40 mx-2 round-0 mb-2' onClick={handlelogout}>Logout</button>
                        </div>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Addattendance