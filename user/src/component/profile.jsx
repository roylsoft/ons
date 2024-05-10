import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import moment from 'moment';


function Profile(props) {

  const [admin, setadmin] = useState([])
  const { mat } = useParams()
  useEffect(() => {
    axios.get('https://ons-client.vercel.app/auth/adminlist/'+mat)
      .then(result => {
        setadmin(result.data.Result[0])
      })
      .catch(err => console.log(err))
  }, [])
  const navigate = useNavigate()
  const handlelogout = () => {
    axios.get('https://ons-client.vercel.app/auth/logout')
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
        <div className='p-3 rounded w-95 border loginForm mt-1' >

          <div className='p-1 d-flex justify-content-around mt-3'>

            <div className='px-2 pt-2 pb-3 border shadow-sm w-5'>
              <div className='text-center pb-1'>
                <img src={"https://ons-client.vercel.app/image/" + admin.pic} alt="photo" className='profile_pic' />
              </div> <hr />
              <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                  <div className='d-flex justify-content-center flex-column align-items mt-0'>

                    <h3>{admin.mat}</h3>
                    <h3>{admin.name}</h3>
                    <h3>{admin.email}</h3>

                  </div>
                </div>

              </div>
            </div>
            <div className='px-2 pt-2 pb-3 border shadow-sm w-5'>
              <div className='text-center pb-1'>
                <h4>{admin.mat}</h4>
              </div> <hr />
              <div className='d-flex justify-content-center'>
                <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                  <div className='d-flex justify-content-center flex-column align-items mt-0'>

                    <h3>Phone         : {admin.phone}</h3>
                    <h3>Grade    : {admin.grade}</h3>
                    <h3>Function    : {admin.role}</h3>
                    <h3>Level         : {admin.level}</h3>
                    <h3>Birth         : {moment(admin.birth).format("DD/MM/YYYY")}</h3>
                    <h3>Place         : {admin.place}</h3>
                    <h3>Sex           : {admin.sex}</h3>
                    <h3>ID Card    : {admin.idcard}</h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className='d-flex justify-content-center mt-1'>
            <button className='btn btn-primary me-2'>Edit</button>
            <button className='btn btn-warning' onClick={handlelogout}>Logout</button>

          </div>

        </div>
      </div>
    </main>

  )
}

export default Profile