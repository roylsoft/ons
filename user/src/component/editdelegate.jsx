import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editdelegate() {
    const [speciality, setSpeciality] = useState([]);
    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let codec = words.pop()
    let mt = words[words.length - 1];


    const [delegate, setdelegate] = useState([]);
    const Navigate = useNavigate()

    const [values, setValues] = useState({
        mat: "",
        spec: "",
        level: "",
        name: ""
    })

    const handleUpdate = (event) => {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('mat', values.mat)
        formdata.append('spec', values.spec)
        formdata.append('level', values.level)
        formdata.append('name', values.name)
        axios.put('http://localhost:3001/auth/editdelegate/' + codec, values)
            .then(result => {
                console.log(result.data);
                Navigate('/adddelegate/' + mt)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(codec)
        axios.get('http://localhost:3001/auth/delegate/' + codec)
            .then(result => {
                setsuite(codec)
                setValues({
                    ...values,
                    mat: result.data.Result[0].mat,
                    spec: result.data.Result[0].speciality,
                    level: result.data.Result[0].level,
                    name: result.data.Result[0].name
                })

            }).catch(err => console.log(err))
    }, [])

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

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Update informations</h2> <br />

                    <form onSubmit={handleUpdate}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="mat"><strong>Mat :</strong></label>
                            <input type="text" value={values.mat} onChange={(e) => setValues({ ...values, mat: e.target.value })}
                                name='mat' placeholder='matriculation number' className='form-control rounded-0' />
                            <label htmlFor="name"><strong>Name :</strong></label>
                            <input type="text" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })}
                                name='name' autoComplete='off' placeholder='name of the course' className='form-control rounded-0' />
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
                            <button type='submit' className='secondary-button round-0 mb-2'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editdelegate