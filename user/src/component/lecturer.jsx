import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import moment from 'moment';



function Lecturer(props) {

  const [staff, setstaff] = useState([])
  const { mat } = useParams()
  useEffect(() => {
    axios.get('http://localhost:3000/staff/staff/' +mat)
      .then(result => {
        setstaff(result.data.Result[0])
      })
      .catch(err => console.log(err))
  }, [])

  const navigate = useNavigate()
  const handlelogout = () => {
    axios.get('http://localhost:3000/staff/logout')
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid")
          navigate('/')
        }
      })
  }


  return (
    <main className='main-container'>
      <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-5 rounded w-100 border loginForm'>
          <div className='p-1 d-flex justify-content-around mt-3 profile'>

            <div className='px-2 pt-2 pb-3 border shadow-sm w-5'>
              <div className='text-center pb-1'>
                <img src={"http://localhost:3000/image/" + staff.pic} alt="photo" className='profile_pic' />
              </div> <hr />
              <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                  <div className='d-flex justify-content-center flex-column align-items mt-0'>

                    <h3>{staff.mat}</h3>
                    <h3>{staff.name}</h3>
                    <h3>{staff.email}</h3>

                  </div>
                </div>

              </div>
            </div>
            <div className='px-2 pt-2 pb-3 border shadow-sm w-5'>
              <div className='text-center pb-1'>
                <h4>{staff.mat}</h4>
              </div> <hr />
              <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                  <div className='d-flex justify-content-center flex-column align-items mt-0'>

                    <h3>Phone         : {staff.phone}</h3>
                    <h3>Grade    : {staff.grade}</h3>
                    <h3>Level         : {staff.level}</h3>
                    <h3>Birth         : {moment(staff.birth).format("DD/MM/YYYY")}</h3>
                    <h3>Place         : {staff.place}</h3>
                    <h3>Sex           : {staff.sex}</h3>
                    <h3>ID Card    : {staff.idcard}</h3>

                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='d-flex justify-content-center mt-1 mb-2'>
            <button className='btn btn-primary me-2 '>Edit</button>
            <button className='btn btn-warning' onClick={handlelogout}>Logout</button>

          </div>

        </div>
      </div>
    </main>


  )
}

export default Lecturer