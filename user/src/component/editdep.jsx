import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editdep() {
    const Navigate = useNavigate()
    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let code = words.pop()
    let mat = words[words.length - 1];
    const [values, setValues] = useState({
        title: "",
        codep: ""
    })

    const handleUpdate = (event) => {
        event.preventDefault()
        axios.put('https://ons-client.vercel.app/auth/editdep/' + code, values)
            .then(result => {
                console.log(result.data);
                Navigate('/department/'+ route)

            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        axios.get('https://ons-client.vercel.app/auth/department/' + code)
            .then(result => {
                setsuite(mat)
                setValues({
                    ...values,

                    title: result.data.Result[0].title,
                    codep: result.data.Result[0].codep
                })
            }).catch(err => console.log(err))
    }, [])
    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Modify this department</h2> <br />

                    <form onSubmit={handleUpdate}>
                        <div className='mb-3'>
                            <label htmlFor="codep"><strong>code :</strong></label>
                            <input type="text" value={values.codep} onChange={(e) => setValues({ ...values, codep: e.target.value })} name='codep' placeholder='The code of the course' className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="title"><strong>title :</strong></label>
                            <input type="text" value={values.title} onChange={(e) => setValues({ ...values, title: e.target.value })} name='title' autoComplete='off' placeholder='The title of the course' className='form-control rounded-0' />
                        </div>
                        <button className='btn btn-success w-100 round-0 mb-2'>Save</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editdep