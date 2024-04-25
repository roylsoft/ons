import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Addstudent() {

    const [speciality, setSpeciality] = useState([]);
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        spec: "",
        level: "",
        birth: "",
        place: "",
        sex: "",
        pic: "",
        pass: ""

    })
    const [error, setError] = useState(null)
    const [Matricule, setmatricule] = useState(null)
    const [errors, setErrors] = useState({});
    const Navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        if (!values.name) {
            newErrors.name = 'Name is required';
        }
        if (!values.level) {
            newErrors.level = 'level is required';
        }
        if (!values.birth) {
            newErrors.birth = 'birth is required';
        }
        if (!values.spec) {
            newErrors.spec = 'Speciality is required';
        }
        if (!values.place) {
            newErrors.place = 'Place is required';
        }
        if (!values.sex) {
            newErrors.sex = 'sexiality is required';
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
        if (!values.cpass) {
            newErrors.cpass = 'Password is required';
        } else if (values.cpass.length < 8) {
            newErrors.cpass = 'Password must be at least 8 characters long';
        }

        if (!values.pic) {
            newErrors.pic = 'Picture is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length == 0; // Return true if there are no errors
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isValid = validateForm();
        console.log(isValid);

        if (isValid) {
            event.preventDefault()
            const formdata = new FormData()
            formdata.append('name', values.name)
            formdata.append('email', values.email)
            formdata.append('phone', values.phone)
            formdata.append('spec', values.spec)
            formdata.append('level', values.level)
            formdata.append('birth', values.birth)
            formdata.append('place', values.place)
            formdata.append('sex', values.sex)
            formdata.append('pic', values.pic)
            formdata.append('pass', values.pass)
            formdata.append('cpass', values.cpass)
            axios.post('http://localhost:3000/student/addstudent', formdata)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        Navigate('/studentlist')
                        setmatricule(result.data.mat)

                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
            console.log(formdata);
        }
    };
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

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center mt-5 align-items-center'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Create and Account</h2> <br />
                    
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="name"><strong>Name<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, name: e.target.value })}
                                name='name' placeholder='Enter your password' className='form-control rounded-2' />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                            <label htmlFor="email"><strong>Email<span className='start'>*</span></strong></label>
                            <input type="e-mail" onChange={(e) => setValues({ ...values, email: e.target.value })}
                                name='email' autoComplete='off' placeholder='Enter your email addres'
                                className='form-control rounded-2' />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="phone"><strong>Phone<span className='start'>*</span></strong></label>
                            <input type="number" onChange={(e) => setValues({ ...values, phone: e.target.value })}
                                name='phone' placeholder='Enter your phone number' className='form-control rounded-2' />
                                {errors.email && <div className="error-message">{errors.phone}</div>}
                            <label htmlFor="speciality" className='form-label'> <strong> Speciality</strong><span className='start'>*</span></label>
                            <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })}
                                className='form-control rounded-2'>
                                <option value="">-- Select --</option>
                                {speciality.map(sp => (
                                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                                ))}
                            </select>
                            {errors.spec && <div className="error-message">{errors.spec}</div>}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="level"><strong>Level<span className='start'>*</span></strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, level: e.target.value })}
                                name='level' autoComplete='off' placeholder='choose your level' className='form-control rounded-2'>
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
                            <label htmlFor="birth"><strong>Birth<span className='start'>*</span></strong></label>
                            <input type="date" onChange={(e) => setValues({ ...values, birth: e.target.value })}
                                name='birth' placeholder='' className='form-control rounded-2' />
                            {errors.birth && <div className="error-message">{errors.birth}</div>}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="place"><strong>Place<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, place: e.target.value })}
                                name='place' autoComplete='off' placeholder='Your place of borwn' className='form-control rounded-2' />
                            {errors.place && <div className="error-message">{errors.place}</div>}
                            <label htmlFor="sex"><strong>Sex<span className='start'>*</span></strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, sex: e.target.value })}
                                name='sex' autoComplete='off' placeholder='choose your gender' className='form-control rounded-2'>
                                <option value="">-- Select --</option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>

                            </select>
                            {errors.sex && <div className="error-message">{errors.sex}</div>}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="pic" className='form-label'><strong>Picture<span className='start'>*</span></strong></label>
                            <input type="file" onChange={(e) => setValues({ ...values, pic: e.target.files[0] })}
                                name='pic' autoComplete='off' placeholder='' className='form-control rounded-2' />
                            {errors.pic && <div className="error-message">{errors.pic}</div>}
                            <label htmlFor="pass"><strong>Password<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, pass: e.target.value })}
                                name='pass' placeholder='Enter your password' className='form-control rounded-2' />
                            {errors.pass && <div className="error-message">{errors.pass}</div>}
                        </div>
                        <div className='text-danger'>
                            {error && error}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="cpass"><strong>Repeat password<span className='start'>*</span></strong></label>
                            <input type="password" onChange={(e) => setValues({ ...values, cpass: e.target.value })}
                                name='cpass' placeholder='Re-enter your password' className='form-control rounded-2' />
                            {errors.cpass && <div className="error-message">{errors.cpass}</div>}
                        </div>
                        <br />
                        <button className='btn btn-success w-100 rounded-5 mb-2'>Create</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Addstudent