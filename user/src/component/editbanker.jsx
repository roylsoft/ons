import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editbanker() {
    const Navigate = useNavigate()

    const [values, setValues] = useState({
        caisse: "",
        password: ""
    })
    const [Error, setError] = useState()
    const handleUpdate = (event) => {
        event.preventDefault()
        axios.put('https://server-six-bice.vercel.app/auth/editbanker/' + values.caisse, values)
            .then(result => {
                if (result.data.createStatus) {
                    Navigate('/solvability')
                } else {
                    setError(result.data.Error)
                }


            })
            .catch(err => console.log(err))
    }

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Modify a banker</h2> <br />
                    <div className='text-danger'>
                        {Error && Error}
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className='mb-3'>
                            <label htmlFor="caisse"><strong>Checkout :</strong></label>
                            <input type="text" value={values.caisse} onChange={(e) => setValues({ ...values, caisse: e.target.value })} name='caisse' placeholder='numerou de caisse' className='form-control rounded-0' />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password"><strong>New Password :</strong></label>
                            <input type="text" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} name='password' autoComplete='off' placeholder='password' className='form-control rounded-0' />
                        </div>
                        <button type='submit' className='btn btn-success w-100 round-0 mb-2'>Save</button>

                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editbanker