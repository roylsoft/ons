import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editcourse() {
    const [speciality, setSpeciality] = useState([]);

    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let codec = words.pop()
    let mat = words[words.length - 1];


    const [staff, setStaff] = useState([]);
    const Navigate = useNavigate()

    const [values, setValues] = useState({
        code: "",
        title: "",
        credit: "",
        spec: "",
        level: "",
        semester: "",
        type: "",
        mat: "",
        name: "",
        phone: ""

    })

    const handleUpdate = (event) => {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('code', values.code)
        formdata.append('title', values.title)
        formdata.append('credit', values.credit)
        formdata.append('spec', values.spec)
        formdata.append('level', values.level)
        formdata.append('semester', values.semester)
        formdata.append('type', values.type)
        formdata.append('mat', values.mat)
        formdata.append('name', values.name)
        formdata.append('phone', values.phone)

        axios.put('https://ons-client.vercel.app/auth/editcourse/' + codec, values)
            .then(result => {
                console.log(result.data);
                Navigate('/courselist/' + route)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        console.log(codec)
        axios.get('https://ons-client.vercel.app/auth/course/' + codec)
            .then(result => {
                setsuite(mat)
                setValues({
                    ...values,
                    code: result.data.Result[0].code,
                    title: result.data.Result[0].title,
                    credit: result.data.Result[0].credit,
                    spec: result.data.Result[0].spec,
                    level: result.data.Result[0].level,
                    semester: result.data.Result[0].semester,
                    type: result.data.Result[0].type,
                    mat: result.data.Result[0].mat,
                    name: result.data.Result[0].name,
                    phone: result.data.Result[0].phone
                })

            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('https://ons-client.vercel.app/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {
                    setSpeciality(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('https://ons-client.vercel.app/staff/staff')
            .then(result => {
                if (result.data.readingStatus) {
                    setStaff(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Modify this course</h2> <br />

                    <form onSubmit={handleUpdate}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="code"><strong>Code :</strong></label>
                            <input type="text" value={values.code} onChange={(e) => setValues({ ...values, code: e.target.value })}
                                name='code' placeholder='code of the course' className='form-control rounded-0' />
                            <label htmlFor="title"><strong>title :</strong></label>
                            <input type="text" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })}
                                name='title' autoComplete='off' placeholder='title of the course' className='form-control rounded-0' />
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="credit"><strong>credit:</strong></label>
                            <input type="number" value={values.credit} onChange={(e) => setValues({ ...values, credit: e.target.value })}
                                name='credit' placeholder='number of credit' className='form-control rounded-0' />
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
                                name='level' autoComplete='off' placeholder='choose level' className='form-control rounded-0'>
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
                            <label htmlFor="semester"><strong>semester:</strong></label>
                            <select type="select" value={values.semester} onChange={(e) => setValues({ ...values, semester: e.target.value })}
                                name='semester' autoComplete='off' placeholder='choose semester' className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="type"><strong>type:</strong></label>
                            <select type="select" value={values.type} onChange={(e) => setValues({ ...values, type: e.target.value })}
                                name='type' autoComplete='off' placeholder='general or special course?' className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                <option value="F">general</option>
                                <option value="M">sepecial</option>

                            </select>
                            <label htmlFor="staff" className='form-label'>Select a lecturer:</label>
                            <select type='select' name="mat" value={values.mat} onChange={(e) => setValues({ ...values, mat: e.target.value })}
                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                {staff.map(sp => (
                                    <option key={sp.mat} value={sp.mat}>{sp.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='mb-3 form-group'>
                            <label htmlFor="name"><strong>Name :</strong></label>
                            <input type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })}
                                name='name' placeholder='name of the lecturer' className='form-control rounded-0' />
                            <label htmlFor="title"><strong>title :</strong></label>
                            <input type="number" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })}
                                name='phone' autoComplete='off' placeholder='phone of the lecturer' className='form-control rounded-0' />
                        </div>

                        <button className='btn btn-success w-100 round-0 mb-2'>Save</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editcourse