import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Addstaff() {
    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let code = words.pop();
    const [values, setValues] = useState({
        codep: "",
        name: "",
        email: "",
        phone: "",
        grade: "",
        birth: "",
        place: "",
        sex: "",
        idcard: "",
        pic: "",
        pass: ""

    })
    const [error, setError] = useState(null)
    const [Matricule, setmatricule] = useState(null)
    const [errors, setErrors] = useState({});
    const Navigate = useNavigate()

    const [department, setValue] = useState([])

    useEffect(() => {
        axios.get('https://admin-rust-gamma.vercel.app/auth/department')
            .then(result => {
                if (result.data.readingStatus) {
                    setValue(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])


    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        // if (!values.dep) {
        //     newErrors.dep = 'department is required';
        // }
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
        }
        if (!values.pass) {
            newErrors.pass = 'Password is required';

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
        console.log(isValid);
        if (isValid) {
            const formdata = new FormData()
            formdata.append('codep', values.codep)
            formdata.append('name', values.name)
            formdata.append('email', values.email)
            formdata.append('phone', values.phone)
            formdata.append('grade', values.grade)
            formdata.append('idcard', values.idcard)
            formdata.append('birth', values.birth)
            formdata.append('place', values.place)
            formdata.append('sex', values.sex)
            formdata.append('pic', values.pic)
            formdata.append('pass', values.pass)
            formdata.append('cpass', values.cpass)
            axios.post('https://admin-rust-gamma.vercel.app/staff/addstaff', formdata)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        Navigate('/staff/' + code)
                        setmatricule(result.data.Matricule)

                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center mt-5'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Create an Account</h2> <br />
                    <div className='text-success'>
                        Your Unique Matriculation number is: {Matricule && Matricule}
                    </div>
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
                                name='phone' placeholder='Enter your phone number'
                                className='form-control rounded-0' />
                            {errors.phone && <div className="error-message">{errors.phone}</div>}
                            <label htmlFor="birth"><strong>Birth<span className='start'>*</span></strong></label>
                            <input type="date" onChange={(e) => setValues({ ...values, birth: e.target.value })}
                                name='birth' placeholder=''
                                className='form-control rounded-0' />
                            {errors.birth && <div className="error-message">{errors.birth}</div>}
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="place"><strong>Place<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, place: e.target.value })}
                                name='place' autoComplete='off' placeholder='Your place of borwn'
                                className='form-control rounded-0' />
                            {errors.place && <div className="error-message">{errors.place}</div>}
                            <label htmlFor="grade"><strong>Grade<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, grade: e.target.value })}
                                name='grade' placeholder='Your drade'
                                className='form-control rounded-0' />
                            {errors.grade && <div className="error-message">{errors.grade}</div>}
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="idcard"><strong>ID card<span className='start'>*</span></strong></label>
                            <input type="number" onChange={(e) => setValues({ ...values, idcard: e.target.value })}
                                name='idcard' autoComplete='off' placeholder='Your ID card number'
                                className='form-control rounded-0' />
                            {errors.idcard && <div className="error-message">{errors.idcard}</div>}
                            <label htmlFor="sex"><strong>Sex<span className='start'>*</span></strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, sex: e.target.value })}
                                name='sex' autoComplete='off' placeholder='choose your gender'
                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>

                            </select>
                            {errors.sex && <div className="error-message">{errors.sex}</div>}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="pic"
                                className='form-label'><strong>Picture<span className='start'>*</span></strong></label>
                            <input type="file" onChange={(e) => setValues({ ...values, pic: e.target.files[0] })} name='pic' autoComplete='off' placeholder=''
                                className='form-control rounded-0' />
                            {errors.pic && <div className="error-message">{errors.pic}</div>}
                            <label htmlFor="department" className='form-label'> <strong> Department</strong><span className='start'>*</span></label>
                            <select type='select' name="codep" onChange={(e) => setValues({ ...values, codep: e.target.value })}
                                className='form-control rounded-2'>
                                <option value="">-- Select --</option>
                                {department.map(sp => (
                                    <option key={sp.codep} value={sp.codep}>{sp.title}</option>
                                ))}
                            </select>
                            {errors.codep && <div className="error-message">{errors.codep}</div>}
                        </div>
                        <div className='text-danger'>
                            {error && error}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="pass"><strong>Password<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, pass: e.target.value })}
                                name='pass' placeholder='Enter your password'
                                className='form-control rounded-0' />
                            {errors.pass && <div className="error-message">{errors.pass}</div>}
                            <label htmlFor="cpass"><strong>Repeat password<span className='start'>*</span></strong></label>
                            <input type="password" onChange={(e) => setValues({ ...values, cpass: e.target.value })}
                                name='cpass' placeholder='Re-enter your password'
                                className='form-control rounded-0' />
                            {errors.cpass && <div className="error-message">{errors.cpass}</div>}
                        </div>
                        <br />
                        <button type='submit' className='btn btn-success w-100 rounded-5 mb-2'>Create</button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Addstaff