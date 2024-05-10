import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editspec() {
    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let code = words.pop()
    let mat = words[words.length - 1];

    const [department, setDepartment] = useState([]);
    const Navigate = useNavigate()
  
    const [values, setValues] = useState({
        codesp: "",
        title: "",
        codep: ""

    })

    const handleUpdate = (event) => {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('codesp', values.codesp)
        formdata.append('title', values.title)
        formdata.append('codep', values.codep)

        axios.put('http://localhost:3000/auth/editspec/' + code, values)
            .then(result => {
              
                Navigate('/specialities/'+route)

            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        axios.get('http://localhost:3000/auth/specialities/' + code)
            .then(result => {
                setsuite(mat)
                setValues({
                    ...values,
                    codesp: result.data.Result[0].codesp,
                    title: result.data.Result[0].title,
                    codep: result.data.Result[0].codep
                })
            }).catch(err => console.log(err))
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/department/')
            .then(result => {
                if (result.data.readingStatus) {
                    setDepartment(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Modify speciality</h2> <br />

                    <form onSubmit={handleUpdate}>
                        <div className='mb-3'>
                            <label htmlFor="code"><strong>code :</strong></label>
                            <input type="text" value={values.codesp} onChange={(e) => setValues({ ...values, codesp: e.target.value })} name='codesp' placeholder='The code of the course' className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="title"><strong>title :</strong></label>
                            <input type="text" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} name='title' autoComplete='off' placeholder='The title of the course' className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="department" className='form-label'>Select a department:</label>
                            <select type='select' name="codep" value={values.codep} onChange={(e) => setValues({ ...values, codep: e.target.value })} className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                {department.map(sp => (
                                    <option key={sp.codep} value={sp.codep}>{sp.title}</option>
                                ))}
                            </select>
                        </div>
                        <button className='btn btn-success w-100 round-0 mb-2'>Save</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editspec