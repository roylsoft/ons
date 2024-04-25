import React, { useState, useEffect } from 'react'
import "./style.css"
import moment from 'moment';
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editstudentprofile() {
    const [speciality, setSpeciality] = useState([]);
    const [student, setStudent] = useState([]);
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const Navigate = useNavigate()
    const { mat } = useParams()
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        spec: "",
        level: "",
        birth: "",
        place: "",
        sex: "",
        pic: ""

    })

    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        // Perform validation for each field
        if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!/^[0-9]{10}$/.test(values.phone)) {
            newErrors.phone = 'Invalid phone number';
        }

        if (values.cpass.length < 8) {
            newErrors.cpass = 'Password must be at least 8 characters long';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const handleUpdate = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
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

            axios.put('http://localhost:3000/student/editstudent/' + mat, formdata)
                .then(result => {
                    console.log(result.data);
                    Navigate('/student/' + result.data.mat)
                    setSuccess(result.data.Matricule)
                })
                .catch(err => console.log(err))
        }
    }


    useEffect(() => {
        axios.get('http://localhost:3000/student/student/' + mat)
            .then(result => {
                setValues({
                    ...values,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    phone: result.data.Result[0].phone,
                    spec: result.data.Result[0].spec,
                    level: result.data.Result[0].level,
                    birth: moment(result.data.Result[0].birth).format("DD/MM/YYYY"),

                    place: result.data.Result[0].place,
                    sex: result.data.Result[0].sex,
                    pic: result.data.Result[0].pic
                })
            }).catch(err => console.log(err))
    }, [])

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
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Update informations</h2> <br />
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="name"><strong>Name :</strong></label>
                            <input type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })}
                                name='name' placeholder='Enter your password' className='form-control rounded-0' />
                            <label htmlFor="email"><strong>Email :</strong></label>
                            <input type="e-mail" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })}
                                name='email' autoComplete='off' placeholder='Enter your email addres'
                                className='form-control rounded-0' />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="phone"><strong>Phone:</strong></label>
                            <input type="number" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })}
                                name='phone' placeholder='Enter your phone number'
                                className='form-control rounded-0' />
                            {errors.phone && <div className="error-message">{errors.phone}</div>}
                            <label htmlFor="speciality" className='form-label'>Select a speciality:</label>
                            <select type='select' name="spec" value={values.spec} onChange={(e) => setValues({ ...values, spec: e.target.value })}
                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                {speciality.map(sp => (
                                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="level"><strong>Level:</strong></label>
                            <select type="select" value={values.level} onChange={(e) => setValues({ ...values, level: e.target.value })}
                                name='level' autoComplete='off' placeholder='choose your level' className='form-control rounded-0'>
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
                            <label htmlFor="birth"><strong>Birth:</strong></label>
                            <input type="date" value={values.birth} onChange={(e) => setValues({ ...values, birth: e.target.value })}
                                name='birth' placeholder='' className='form-control rounded-0' />
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="place"><strong>Place :</strong></label>
                            <input type="text" value={values.place} onChange={(e) => setValues({ ...values, place: e.target.value })}
                                name='place' autoComplete='off' placeholder='Your place of borwn' className='form-control rounded-0' />
                            <label htmlFor="sex"><strong>Sex:</strong></label>
                            <select type="select" value={values.sex} onChange={(e) => setValues({ ...values, sex: e.target.value })}
                                name='sex' autoComplete='off' placeholder='choose your gender' className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                <option value="F">Female</option>
                                <option value="M">Male</option>

                            </select>
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="pic" className='form-label'><strong>Picture:</strong></label>
                            <input type="file" onChange={(e) => setValues({ ...values, pic: e.target.files[0] })} name='pic' autoComplete='off' placeholder='' className='form-control rounded-0' />
                        </div>
                        <button className='btn btn-success w-100 round-0 mb-2'>Save</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editstudentprofile