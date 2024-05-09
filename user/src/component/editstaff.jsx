import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editstaff() {


    const Navigate = useNavigate()
    let way = location.pathname
    let words = way.split("/")
    let mat=words.pop()
    let route = words[words.length - 2];
    const [values, setValues] = useState({
        name: "",
        email: "",
        codep: "",
        phone: "",
        grade: "",
        idcard: "",
        birth: "",
        place: "",
        sex: "",
        coasthour: "",
        pic: ""

    })

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

    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        // Perform validation for each field
        if (!/^\S+@\S+\.\S+$/.test(values.email)) {
            newErrors.email = 'Invalid email address';
        }

        // if (!/^[0-9]{10}$/.test(values.phone)) {
        //     newErrors.phone = 'Invalid phone number';
        // }

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
            formdata.append('codep', values.codep)
            formdata.append('phone', values.phone)
            formdata.append('grade', values.grade)
            formdata.append('idcard', values.idcard)
            formdata.append('birth', values.birth)
            formdata.append('place', values.place)
            formdata.append('sex', values.sex)
            formdata.append('coasthour', values.coasthour)

            axios.put('https://admin-rust-gamma.vercel.app/auth/editstaff/' + mat, values)
                .then(result => {
                    console.log(result.data);
                    Navigate('/staff/'+route)

                })
                .catch(err => console.log(err))
        }
    }


    useEffect(() => {
        axios.get('https://admin-rust-gamma.vercel.app/staff/staff/' + mat)
            .then(result => {
                setValues({
                    ...values,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    codep: result.data.Result[0].codep,
                    phone: result.data.Result[0].phone,
                    grade: result.data.Result[0].grade,
                    idcard: result.data.Result[0].idcard,
                    birth: result.data.Result[0].birth,
                    place: result.data.Result[0].place,
                    sex: result.data.Result[0].sex,
                    coasthour: result.data.Result[0].coasthour

                })
            }).catch(err => console.log(err))
    }, [])


    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Update informations</h2> <br />

                    <form onSubmit={handleUpdate}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="name"><strong>Name :</strong></label>
                            <input type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })}
                                name='name' placeholder='Enter your name' className='form-control rounded-0' />
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
                            {/* {errors.phone && <div className="error-message">{errors.phone}</div>} */}
                            <label htmlFor="grade"><strong>Grade:</strong></label>
                            <input type="text" value={values.grade} onChange={(e) => setValues({ ...values, grade: e.target.value })}
                                name='grade' autoComplete='off' placeholder='Your grade' className='form-control rounded-0' />
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="idcard"><strong>ID card:</strong></label>
                            <input type="text" value={values.idcard} onChange={(e) => setValues({ ...values, idcard: e.target.value })}
                                name='idcard' autoComplete='off' placeholder='Your ID card goes here' className='form-control rounded-0' />
                            <label htmlFor="birth"><strong>Birth:</strong></label>
                            <input type="date" value={values.birth} onChange={(e) => setValues({ ...values, birth: moment(e.target.value).format("DD/MM/YYYY") })}
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
                            <label htmlFor="coasthour"><strong>Hourly gain:</strong></label>
                            <input type="text" value={values.coasthour} onChange={(e) => setValues({ ...values, coasthour: e.target.value })}
                                name='coasthour' autoComplete='off' placeholder='hourly gain' className='form-control rounded-0' />
                            <label htmlFor="department" className='form-label'> <strong> Department</strong><span className='start'>*</span></label>
                            <select type='select' name="codep" onChange={(e) => setValues({ ...values, codep: e.target.value })}
                                className='form-control rounded-2'>
                                <option value="">-- Select --</option>
                                {department.map(sp => (
                                    <option key={sp.codep} value={sp.title}>{sp.title}</option>
                                ))}
                            </select>
                            {errors.codep && <div className="error-message">{errors.codep}</div>}
                            <button className='btn btn-success w-100 round-0 mb-2 form-control'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editstaff