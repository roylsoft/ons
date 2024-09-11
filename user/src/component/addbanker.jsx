import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

function Addbanker() {

    let way = location.pathname
    let words = way.split("/")
    let code = words.pop();

    const [values, setValues] = useState({
        caisse: "",
        password: "",
        name: "",
        phone: "",
        cle: "",
        branch: ""

    })
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({});
    const [value, setValue] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/auth/banker')
            .then(result => {
                setValue(result.data.Result)
            }).catch(err => console.log(err))
    }, [])


    const handelDelete = (caisse) => {
        axios.delete('http://localhost:3001/auth/deletebanker/' + caisse)
            .then(result => {
                if (result.data.deleteStatus) {
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
    }

    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        if (!values.cle) {
            newErrors.cle = 'You are not allow to perform this operation';
        }
        if (values.cle != "1910sourceVally1606*") {
            newErrors.cle = 'You are not allow to perform this operation';
        }
        if (!values.caisse) {
            newErrors.caisse = 'checkout number is required';
        }
        if (!values.password) {
            newErrors.password = 'password is required';
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };



    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.post('http://localhost:3001/auth/addbanker', values)
                .then(result => {
                    if (result.data.createStatus) {
                        window.location.reload()
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const url = 'http://localhost:3001/auth/addbanker.jsx';
    const title = 'Thank you joinig nfonap_hieps';
    const description = 'Please create your acount in our system!';

    return (
        <main className='main-container'>
            <div className='d-flex justify-content-center align-items-center vh-90 loginPage'>
                <div className='p-1 rounded w-60 border loginForm'>

                    <h2>Add a new banker</h2> <br />

                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <div className='mb-2 form-group'>
                        {errors.cle && <div className="error-message">{errors.cle}</div>}
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className='mb-2 form-group'>
                            <label htmlFor="cle"><strong>Admin key:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, cle: e.target.value })}
                                name='cle' autoComplete='off' placeholder='Enter key'
                                className='form-control rounded-0' />
                        </div>
                        <div className='mb-2 form-group'>
                            <label htmlFor="caisse"><strong>Checkout number:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, caisse: e.target.value })}
                                name='caisse' autoComplete='off' placeholder='Numero de caisse'
                                className='form-control rounded-0' />
                            {errors.caisse && <div className="error-message">{errors.caisse}</div>}
                            <label htmlFor="name"><strong>name</strong></label>
                            <input type="text" onChange={(e) => setValues({
                                ...values, name:
                                    e.target.value
                            })} name='name' autoComplete='off' placeholder='name'
                                className='form-control rounded-0' />
                            {errors.name && <div className="error-message">{errors.name}</div>}

                        </div>

                        <div className='mb-1 form-group'>
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
                            {errors.branch && <div className="error-message">{errors.branch}</div>}

                            <label htmlFor="phone"><strong>Phone:</strong></label>
                            <input type="number" onChange={(e) => setValues({ ...values, phone: e.target.value })}
                                name='phone' placeholder='Enter the phone number'
                                className='form-control rounded-0' />
                            {errors.phone && <div className="error-message">{errors.phone}</div>}
                        </div>
                        <div className='mb-1 form-group'>
                            <label htmlFor="password"><strong>Password:</strong></label>
                            <input type="password" onChange={(e) => setValues({ ...values, password: e.target.value })}
                                name='password' placeholder='Enter the password'
                                className='form-control rounded-0' />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                            <button type="submit" className='secondary-button round-5'>Create</button>
                        </div>


                    </form>
                </div>
            </div>

            <div className='mt-3 px-2'>
                <div className='ms-1 '>
                    <Table striped bordered hover variant="dark" responsive>
                        <thead>
                            <tr>
                                <th>Checkout</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Branch</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                value.map(sp => (
                                    <tr>
                                        <td>{sp.caisse}</td>
                                        <td>{sp.name}</td>
                                        <td>{sp.phone}</td>
                                        <td>{sp.branch}</td>

                                        <td>
                                            <Link to={`/editbanker/${code}/` + sp.caisse} className='btn btn-info btn-sm me-2 bi-pencil-square'></Link>
                                            <Link className='btn btn-danger btn-sm bi-trash' onClick={() => handelDelete(sp.caisse)}></Link>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </main>

    )
}

export default Addbanker