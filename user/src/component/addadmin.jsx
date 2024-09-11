import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Addadmin() {

    let way = location.pathname
    let words = way.split("/")
    let code = words.pop();

    const [values, setValues] = useState({
        branch: "",
        year: "",
        name: "",
        email: "",
        phone: "",
        grade: "",
        birth: "",
        place: "",
        sex: "",
        idcard: "",
        role: "",
        pic: "",
        pass: ""
    })
    const handleSubmit = (event) => {
        event.preventDefault()
        // const isValid = validateForm();

        // if (isValid) {
        const formdata = new FormData()
        formdata.append('branch', values.branch)
        formdata.append('year', values.year)
        formdata.append('name', values.name)
        formdata.append('email', values.email)
        formdata.append('phone', values.phone)
        formdata.append('grade', values.grade)
        formdata.append('idcard', values.idcard)
        formdata.append('birth', values.birth)
        formdata.append('place', values.place)
        formdata.append('sex', values.sex)
        formdata.append('role', values.role)
        formdata.append('pic', values.pic)
        formdata.append('pass', values.pass)
        // formdata.append('cpass', values.cpass)

        axios.post('http://localhost:3001/auth/addadmin', formdata)
            .then(result => {
                if (result.data.createStatus) {
                    navigate('/home/' + result.data.result)
                } else {
                    setError(result.data.Error)
                }
            }).catch(err => console.log(err))

    }
    // }

    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()


    // const validateForm = () => {
    //     const newErrors = {};

    //     // Perform validation for each field
    //     if (!values.name) {
    //         newErrors.name = 'Name is required';
    //     }
    //     if (!values.grade) {
    //         newErrors.grade = 'Grade is required';
    //     }
    //     if (!values.birth) {
    //         newErrors.birth = 'Birth date is required';
    //     }
    //     if (!values.idcard) {
    //         newErrors.idcard = 'ID card is required';
    //     }
    //     if (!values.place) {
    //         newErrors.place = 'Place is required';
    //     }
    //     if (!values.sex) {
    //         newErrors.sex = 'Sex is required';
    //     }

    //     if (!values.email) {
    //         newErrors.email = 'Email is required';
    //     } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    //         newErrors.email = 'Invalid email address';
    //     }

    //     if (!values.phone) {
    //         newErrors.phone = 'Phone number is required';
    //     }

    //     if (!values.pass) {
    //         newErrors.pass = 'Password is required';
    //     } else if (values.cpass.length < 8) {
    //         newErrors.cpass = 'Password must be at least 8 characters long';
    //     }

    //     if (!values.pic) {
    //         newErrors.pic = 'Picture is required';
    //     }

    //     setErrors(newErrors);

    //     return Object.keys(newErrors).length === 0; // Return true if there are no errors
    // };



    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center mt-5'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Create an Account</h2> <br />
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
                            {/* {errors.branch && <div className="error-message">{errors.branch}</div>} */}
                            <label htmlFor="year"><strong>Academic year<span className='start'>*</span></strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, year: e.target.value })}
                                name='year' autoComplete='off' placeholder='academic year' className='form-control rounded-2'>
                                <option value="">-- Select the academic year --</option>
                                <option value="2024_2025">2024/2025</option>
                                <option value="2025_2026">2025/2026</option>
                                <option value="2026_2027">2026/2027</option>
                                <option value="2027_2028">2027/2028</option>
                                <option value="2028_2029">2028/2029</option>
                            </select>
                            {/* {errors.year && <div className="error-message">{errors.year}</div>} */}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="name"><strong>Name<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, name: e.target.value })}
                                name='name' placeholder='Enter your name' className='form-control rounded-2' />
                            {/* {errors.name && <div className="error-message">{errors.name}</div>} */}
                            <label htmlFor="email"><strong>Email<span className='start'>*</span></strong></label>
                            <input type="e-mail" onChange={(e) => setValues({ ...values, email: e.target.value })}
                                name='email' autoComplete='off' placeholder='Enter your email addres'
                                className='form-control rounded-2' />
                            {/* {errors.email && <div className="error-message">{errors.email}</div>} */}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="phone"><strong>Phone<span className='start'>*</span></strong></label>
                            <input type="number" onChange={(e) => setValues({ ...values, phone: e.target.value })}
                                name='phone' placeholder='Enter your phone number'
                                className='form-control rounded-0' />
                            {/* {errors.phone && <div className="error-message">{errors.phone}</div>} */}
                            <label htmlFor="birth"><strong>Birth<span className='start'>*</span></strong></label>
                            <input type="date" onChange={(e) => setValues({ ...values, birth: e.target.value })}
                                name='birth' placeholder=''
                                className='form-control rounded-0' />
                            {/* {errors.birth && <div className="error-message">{errors.birth}</div>} */}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="place"><strong>Place<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, place: e.target.value })}
                                name='place' autoComplete='off' placeholder='Your birth place'
                                className='form-control rounded-0' />
                            {/* {errors.place && <div className="error-message">{errors.place}</div>} */}
                            <label htmlFor="grade"><strong>Grade<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, grade: e.target.value })}
                                name='grade' placeholder='Your grade'
                                className='form-control rounded-0' />
                            {/* {errors.grade && <div className="error-message">{errors.grade}</div>} */}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="idcard"><strong>ID card<span className='start'>*</span></strong></label>
                            <input type="number" onChange={(e) => setValues({ ...values, idcard: e.target.value })}
                                name='idcard' autoComplete='off' placeholder='Your ID card number'
                                className='form-control rounded-0' />
                            {/* {errors.idcard && <div className="error-message">{errors.idcard}</div>} */}
                            <label htmlFor="sex"><strong>Sex<span className='start'>*</span></strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, sex: e.target.value })}
                                name='sex' autoComplete='off' placeholder='choose your gender'
                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>

                            </select>
                            {/* {errors.sex && <div className="error-message">{errors.sex}</div>} */}
                            <label htmlFor="role"><strong>Role<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, role: e.target.value })}
                                name='role' autoComplete='off' placeholder='Your role'
                                className='form-control rounded-0' />
                            {/* {errors.role && <div className="error-message">{errors.role}</div>} */}
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="pic"
                                className='form-label'><strong>Picture<span className='start'>*</span></strong></label>
                            <input type="file" onChange={(e) => setValues({ ...values, pic: e.target.files[0] })} name='pic' autoComplete='off' placeholder=''
                                className='form-control rounded-0' />
                            {/* {errors.pic && <div className="error-message">{errors.pic}</div>} */}
                            <label htmlFor="pass"><strong>Password<span className='start'>*</span></strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, pass: e.target.value })}
                                name='pass' placeholder='Enter your password'
                                className='form-control rounded-0' />
                            {/* {errors.pass && <div className="error-message">{errors.pass}</div>} */}
                        </div>

                        <div className='mb-3 form-group'>

                            {/* <label htmlFor="cpass"><strong>Repeat password<span className='start'>*</span></strong></label>
                            <input type="password" onChange={(e) => setValues({ ...values, cpass: e.target.value })}
                                name='cpass' placeholder='Re-enter your password'
                                className='form-control rounded-0' />
                            // {errors.cpass && <div className="error-message">{errors.cpass}</div>} */}
                            <button type='submit' className='secondary-button rounded-5 mb-2'>Create</button>
                        </div>
                        <br />

                    </form>
                </div>
            </div>
        </main>
    )
}

export default Addadmin