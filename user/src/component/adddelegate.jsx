import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';

function Adddelegate() {
    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let code = words.pop();
    const [speciality, setSpeciality] = useState([]);
    const [values, setValues] = useState({
        mat: "",
        name: "",
        speciality: "",
        level: ""

    })
    const [value, setValue] = useState([])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3001/auth/delegate')
            .then(result => {
                setsuite(code)
                setValue(result.data.Result)
            }).catch(err => console.log(err))
    }, [])

    const handelDelete = (mat) => {
        axios.delete('http://localhost:3001/auth/deletedelegate/' + mat)
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
        if (!values.mat) {
            newErrors.mat = 'mat is required';
        }
        if (!values.name) {
            newErrors.name = 'name is required';
        }

        if (!values.speciality) {
            newErrors.speciality = 'speciality is required';
        }
        if (!values.level) {
            newErrors.level = 'level is required';
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const Navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.post('http://localhost:3001/auth/adddelegate', values)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        setSuccess(result.data.Matricule)
                        window.location.reload()
                    } else {
                        setError(result.data.Error)
                    }
                })
                .catch(err => console.log(err))
        }
    }


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

                    <h2>Elect a delegate</h2> <br />
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2 form-group'>
                            <label htmlFor="mat"><strong>matriculation</strong></label>
                            <input type="text" onChange={(e) => setValues({
                                ...values, mat:
                                    e.target.value
                            })} name='mat' placeholder='matriculation'
                                className='form-control rounded-0' />
                            {errors.mat && <div className="error-message">{errors.mat}</div>}
                            <label htmlFor="name"><strong>name</strong></label>
                            <input type="text" onChange={(e) => setValues({
                                ...values, name:
                                    e.target.value
                            })} name='name' autoComplete='off' placeholder='name'
                                className='form-control rounded-0' />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="speciality" className='form-label'>Select a speciality:</label>
                            <select type='select' name="speciality" onChange={(e) => setValues({
                                ...values, speciality:
                                    e.target.value
                            })}
                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                {speciality.map(sp => (
                                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                                ))}
                            </select>
                            {errors.speciality && <div className="error-message">{errors.speciality}</div>}
                            <label htmlFor="level"><strong>Level:</strong></label>
                            <select type="select" onChange={(e) => setValues({
                                ...values, level:
                                    e.target.value
                            })} name='level' autoComplete='off' placeholder='choose your level'
                                className='form-control rounded-0'>
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
                            {errors.level && <div className="error-message">{errors.level}</div>}
                        </div>


                        <br />
                        <button className='secondary-button rounded-5 mb-2'>Create</button>
                    </form>
                </div>
            </div>
            <div className='px-2 mt-1'>
                
                <div className='mt-1  ms-1 '>
                    <Table striped bordered hover variant="dark" responsive>
                        <thead>
                            <tr>
                                <th>Matriculation</th>
                                <th>Name</th>
                                <th>Specialisaty</th>
                                <th>Level</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                value.map(sp => (
                                    <tr>
                                        <td>{sp.mat}</td>
                                        <td>{sp.name}</td>
                                        <td>{sp.speciality}</td>
                                        <td>{sp.level}</td>

                                        <td>
                                            <Link to={`/editdelegate/${route}/` + sp.mat} className='btn btn-info btn-sm me-2 bi-pencil-square'></Link>
                                            <Link className='btn btn-danger btn-sm bi-trash' onClick={() => handelDelete(sp.mat)}></Link>
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

export default Adddelegate