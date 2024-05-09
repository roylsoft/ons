import React, { useState, useEffect } from 'react'
import "./style.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Adddepartment() {
  const [route, setsuite] = useState("");
  let way = location.pathname
  let words = way.split("/")
  let code = words.pop();
  const [values, setValues] = useState({
    codep: "",
    title: ""
  })
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Perform validation for each field
    if (!values.codep) {
      newErrors.codep = 'code is required';
    }
    if (!values.title) {
      newErrors.title = 'title is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const [department, setDepartement] = useState([]);
  const Navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const isValid = validateForm();
    if (isValid) {
      axios.post('https://server-six-bice.vercel.app/auth/adddepartment', values)
        .then(result => {
          if (result.data.createStatus) {
            console.log(result.data);
            Navigate('/department/'+code)
          } else {
            setError(result.data.Error)
          }
        })
        .catch(err => console.log(err))
    }
  }
  useEffect(() => {
    axios.get('https://server-six-bice.vercel.app/auth/department')
      .then(result => {
        if (result.data.readingStatus) {
          setDepartement(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  return (
    <main className='main-container'>
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-60 border loginForm'>

          <h2>Add a new department</h2> <br />
          <div className='text-danger'>
            {error && error}
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="codep"><strong>Department code:</strong></label>
              <input type="text" onChange={(e) => setValues({ ...values, codep: e.target.value })}
               name='codep' autoComplete='off' placeholder='Enter the code' 
               className='form-control rounded-0' />
               {errors.codep && <div className="error-message">{errors.codep}</div>}
            </div>
            <div className='mb-3'>
              <label htmlFor="title"><strong>Name:</strong></label>
              <input type="text" onChange={(e) => setValues({ ...values, title: e.target.value })}
               name='title' placeholder='Enter the title' 
               className='form-control rounded-0' />
               {errors.title && <div className="error-message">{errors.title}</div>}
            </div>

            <button className='btn btn-success w-100 round-5 mb-2'>Create</button>

          </form>
        </div>
      </div>
    </main>

  )
}

export default Adddepartment