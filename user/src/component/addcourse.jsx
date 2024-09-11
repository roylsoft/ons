import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Addcourse() {
    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let code = words.pop();
    const [speciality, setSpeciality] = useState([]);
    const [values, setValues] = useState({
        code: "",
        title: "",
        credit: "",
        speciality: "",
        level: "",
        branch: "",
        year: "",
        type: ""

    })
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        // Perform validation for each field
        if (!values.code) {
            newErrors.code = 'code is required';
        }
        if (!values.title) {
            newErrors.title = 'title is required';
        }
        if (!values.credit) {
            newErrors.credit = 'credit is required';
        }
        if (!values.speciality) {
            newErrors.speciality = 'speciality is required';
        }
        if (!values.level) {
            newErrors.level = 'level is required';
        }
        if (!values.type) {
            newErrors.type = 'type is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const Navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validateForm();
        if (isValid) {
            axios.post('http://localhost:3001/auth/addcourse', values)
                .then(result => {
                    if (result.data.createStatus) {
                        console.log(result.data);
                        Navigate('/courselist/' + code)
                        setSuccess(result.data.Matricule)

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

                    <h2>Add a new course</h2> <br />
                    <div className='text-danger'>
                        {error && error}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3 form-group'>
                            <label htmlFor="code"><strong>Code :</strong></label>
                            <input type="text" onChange={(e) => setValues({
                                ...values, code:
                                    e.target.value
                            })} name='code' placeholder='course code'
                                className='form-control rounded-0' />
                            {errors.code && <div className="error-message">{errors.code}</div>}
                            <label htmlFor="title"><strong>course title :</strong></label>
                            <input type="text" onChange={(e) => setValues({
                                ...values, title:
                                    e.target.value
                            })} name='title' autoComplete='off' placeholder='course title'
                                className='form-control rounded-0' />
                            {errors.title && <div className="error-message">{errors.title}</div>}
                        </div>

                        <div className='mb-3 form-group'>
                            <label htmlFor="credit"><strong>Credit:</strong></label>
                            <input type="number" onChange={(e) => setValues({
                                ...values, credit:
                                    e.target.value
                            })} name='credit' placeholder='course credit'
                                className='form-control rounded-0' />
                            {errors.credit && <div className="error-message">{errors.credit}</div>}
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
                        </div>

                        <div className='mb-3 form-group'>
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
                            <label htmlFor="type"><strong>Course type:</strong></label>
                            <select type="select" onChange={(e) => setValues({
                                ...values, type:
                                    e.target.value
                            })} name='type' autoComplete='off' placeholder='choose your level'
                                className='form-control rounded-0'>
                                <option value="">-- Select --</option>
                                <option value="fondamental">fondamental</option>
                                <option value="professional">professional</option>
                                <option value="transversal">transversal</option>
                                <option value="cross-sectional">cross-sectional</option>
                            </select>
                            {errors.type && <div className="error-message">{errors.type}</div>}
                        </div>
                        <br />
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
                            <select type="select" onChange={(e) => setValues({ ...values, year: e.target.value })}
                                name='year' autoComplete='off' placeholder='academic year' className='form-control rounded-2'>
                                <option value="">-- Select  the academic year--</option>
                                <option value="2024_2025">2024/2025</option>
                                <option value="2025_2026">2025/2026</option>
                                <option value="2026_2027">2026/2027</option>
                                <option value="2027_2028">2027/2028</option>
                                <option value="2028_2029">2028/2029</option>
                            </select>

                        </div>
                        <button className='secondary-button rounded-5 mb-2'>Create</button>


                    </form>
                </div>
            </div>
        </main>

    )
}

export default Addcourse