import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'


function Addstudent() {

    let way = location.pathname
    let words = way.split("/")
    let code = words.pop();
    const [loading, setLoading] = useState(false);
    const [speciality, setSpeciality] = useState([]);
    const [values, setValues] = useState({
        branch: "",
        year: "",
        name: "",
        email: "",
        phone: "",
        perentphone: "",
        spec: "",
        level: "",
        birth: "",
        place: "",
        sex: "",
        // pic: "",
        pass: "",
    })
    const [error, setError] = useState(null)
    const [Matricule, setmatricule] = useState(null)
    const [errors, setErrors] = useState({});
    const Navigate = useNavigate()

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

    // const validateForm = () => {
    //     const newErrors = {};
    //     if (!values.name) {
    //         newErrors.name = 'Name is required';
    //     }

    //     if (!values.birth) {
    //         newErrors.birth = 'birth is required';
    //     }

    //     if (!values.place) {
    //         newErrors.place = 'Place is required';
    //     }
    //     if (!values.sex) {
    //         newErrors.sex = 'sex is required';
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
    //     }

    //     if (!values.pic) {
    //         newErrors.pic = 'Picture is required';
    //     }

    //     setErrors(newErrors);

    //     return Object.keys(newErrors).length === 0; // Return true if there are no errors
    // };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const isValid = validateForm();
        // console.log(isValid);
        // // if (isValid) {
            event.preventDefault()
            const formdata = new FormData()
            formdata.append('branch', values.branch)
            formdata.append('year', values.year)
            formdata.append('name', values.name)
            formdata.append('email', values.email)
            formdata.append('phone', values.phone)
            formdata.append('perentphone', values.perentphone)
            formdata.append('spec', values.spec)
            formdata.append('level', values.level)
            formdata.append('birth', values.birth)
            formdata.append('place', values.place)
            formdata.append('sex', values.sex)
            // formdata.append('pic', values.pic)
            formdata.append('pass', values.pass)
            axios.post('http://localhost:3001/auth/addstudent', values)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        Navigate('/studentlist/' + code)
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
            
        // // }
    };


    return (
        <main className='main-container'>
        <div className='d-flex justify-content-center mt-2 mb-4 align-items-center'>
            <div className='p-3 border-rounded border loginForm'>

                <h5>Create and Account</h5>
                <div className='text-success'>
                    <h6><span className='secondary-button w-100 mb-2'> <button className='secondary-button w-100' onClick={() => handleCopy(Matricule)}>
                        Click to copy your matricule :{Matricule}
                    </button></span></h6>
                </div>
                {loading && (
                    <div className="loader-container">
                        <div className="loader">Verifying...</div>
                    </div>
                )}
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
                            name='phone' placeholder='Enter your phone number' className='form-control rounded-2' />
                        <label htmlFor="perentphone"><strong>Tutor phone<span className='start'>*</span></strong></label>
                        <input type="number" onChange={(e) => setValues({ ...values, perentphone: e.target.value })}
                            name='perentphone' placeholder='Your tutor phone number' className='form-control rounded-2' />

                    </div>
                    <div className='mb-3 form-group'>
                        <label htmlFor="speciality" className='form-label'> <strong> Speciality</strong><span className='start'>*</span></label>
                        <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })}
                            className='form-control rounded-2'>
                            <option value="">-- Select --</option>
                            {speciality.map(
                                sp => (
                                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                                )
                            )}
                        </select>
                        {/* {errors.spec && <div className="error-message">{errors.spec}</div>} */}
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
                        {/* {errors.level && <div className="error-message">{errors.level}</div>} */}

                    </div>
                    <div className='mb-3 form-group'>
                        <label htmlFor="birth"><strong>Birth<span className='start'>*</span></strong></label>
                        <input type="date" onChange={(e) => setValues({ ...values, birth: e.target.value })}
                            name='birth' placeholder='' className='form-control rounded-2' />
                        {/* {errors.birth && <div className="error-message">{errors.birth}</div>} */}
                        <label htmlFor="place"><strong>Place<span className='start'>*</span></strong></label>
                        <input type="text" onChange={(e) => setValues({ ...values, place: e.target.value })}
                            name='place' autoComplete='off' placeholder='Your birth place' className='form-control rounded-2' />
                        {/* {errors.place && <div className="error-message">{errors.place}</div>} */}

                    </div>
                    <div className='mb-3 form-group'>
                        <label htmlFor="sex"><strong>Sex<span className='start'>*</span></strong></label>
                        <select type="select" onChange={(e) => setValues({ ...values, sex: e.target.value })}
                            name='sex' autoComplete='off' placeholder='choose your gender' className='form-control rounded-2'>
                            <option value="">-- Select --</option>
                            <option value="F">Female</option>
                            <option value="M">Male</option>

                        </select>
                        {/* {errors.sex && <div className="error-message">{errors.sex}</div>}
                        <label htmlFor="pic" className='form-label'><strong>Picture<span className='start'>*</span></strong></label>
                        <input type="file" onChange={(e) => setValues({ ...values, pic: e.target.files[0] })}
                            name='pic' autoComplete='off' placeholder='' className='form-control rounded-2' /> */}
                        {/* {errors.pic && <div className="error-message">{errors.pic}</div>} */}
                    </div>

                    <div className='mb-1 form-group'>
                        <label htmlFor="pass"><strong>Password<span className='start'>*</span></strong></label>
                        <input type="text" onChange={(e) => setValues({ ...values, pass: e.target.value })}
                            name='pass' placeholder='Enter your password' className='form-control rounded-2' autoComplete='off' />
                        {/* {errors.pass && <div className="error-message">{errors.pass}</div>} */}
                    </div>
                    <br />

                    <div className='d-flex justify-content-center form-group'>
                        <button type="submit" className='secondary-button mb-1 rounded-3'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
    )
}

export default Addstudent