import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'

function Editbanker() {
    const Navigate = useNavigate()
    let way = location.pathname
    let words = way.split("/")
    let caisse = words.pop()
    let route = words[words.length - 1];

    const [values, setValues] = useState({
        caisse: "",
        password: "",
        name: "",
        phone: "",
        cle: "",
        branch: ""
    })

    useEffect(() => {
        axios.get('http://localhost:3001/auth/banker/' + caisse)
            .then(result => {

                setValues({
                    ...values,
                    caisse: result.data.Result[0].caisse,
                    branch: result.data.Result[0].branch,
                    phone: result.data.Result[0].phone,
                    password: result.data.Result[0].password,
                    name: result.data.Result[0].name
                })

            }).catch(err => console.log(err))
    }, [])

    const [Error, setError] = useState()
    const handleUpdate = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.put('http://localhost:3001/auth/editbanker/' + values.caisse, values)
                .then(result => {
                    if (result.data.createStatus) {
                        Navigate('/addbanker/' + route)
                        window.location.reload()
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }

    }

    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        if (!values.cle) {
            newErrors.cle = 'You are not allow to perform this operation';
        }
        if (values.cle != "1910sourceVally1606*") {
            newErrors.cle = 'You are not allow to perform this operation';
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };
    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center h-100 loginPage'>
                <div className='p-3 border-rounded w-60 bolder loginForm'>

                    <h2>Modify a banker</h2> <br />
                    <div className='text-danger'>
                        {Error && Error}
                    </div>
                    <div className='mb-2 form-group'>
                        {errors.cle && <div className="error-message">{errors.cle}</div>}
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className='mb-2 form-group'>
                            <label htmlFor="cle"><strong>Admin key:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, cle: e.target.value })}
                                name='cle' autoComplete='off' placeholder='Enter key'
                                className='form-control rounded-0' />
                        </div>
                        <div className='mb-2 form-group'>
                            <label htmlFor="caisse"><strong>Checkout number:</strong></label>
                            <input type="text" value={values.caisse} onChange={(e) => setValues({ ...values, caisse: e.target.value })}
                                name='caisse' autoComplete='off' placeholder='Numero de caisse'
                                className='form-control rounded-0' />

                            <label htmlFor="name"><strong>name</strong></label>
                            <input type="text" value={values.name} onChange={(e) => setValues({
                                ...values, name:
                                    e.target.value
                            })} name='name' autoComplete='off' placeholder='name'
                                className='form-control rounded-0' />

                        </div>

                        <div className='mb-1 form-group'>
                            <label htmlFor="branch"><strong>Branch<span className='start'>*</span></strong></label>
                            <select type="select" value={values.branch} onChange={(e) => setValues({ ...values, branch: e.target.value })}
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

                            <label htmlFor="phone"><strong>Phone:</strong></label>
                            <input type="number" value={values.phone} onChange={(e) => setValues({ ...values, phone: e.target.value })}
                                name='phone' placeholder='Enter the phone number'
                                className='form-control rounded-0' />

                        </div>
                        <div className='mb-1 form-group'>
                            <label htmlFor="password"><strong>Password:</strong></label>
                            <input type="password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })}
                                name='password' placeholder='Enter the password'
                                className='form-control rounded-0' />

                            <button type="submit" className='secondary-button round-5'>Create</button>
                        </div>


                    </form>
                </div>
            </div>
        </main>

    )
}

export default Editbanker