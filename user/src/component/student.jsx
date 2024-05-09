import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import moment from 'moment';



const Student = (props) => {
    const [student, setStudent] = useState([])
    const {mat}= useParams()
    useEffect(() => {
        axios.get('https://server-six-bice.vercel.app/student/student/'+mat)
        .then(result => {
            setStudent(result.data.Result[0])
        })
        .catch(err => console.log(err))
    },[])

    const navigate = useNavigate()
    const handlelogout =()=>{
      axios.get('https://server-six-bice.vercel.app/student/logout')
      .then(result=>{
       if(result.data.Status){
        localStorage.removeItem("valid")
           navigate('/')
       }
      })
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-5 rounded w-100 border loginForm'>
            
            <div className='p-1 d-flex justify-content-around mt-3 profile'>
               
                <div className='px-2 pt-2 pb-3 border shadow-sm w-5'>
                  <div className='text-center pb-1'>
                    <img src={"https://server-six-bice.vercel.app/image/"+student.pic} alt="photo" className='profile_pic'/>
                  </div> <hr />
                  <div className='d-flex justify-content-center'>
                    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                      <div className='d-flex justify-content-center flex-column align-items mt-0'>
                        
                        <h3>{student.mat}</h3> 
                        <h3>{student.name}</h3> 
                        <h3>{student.email}</h3>
                          
                      </div>
                    </div>
                    
                  </div>
                </div>
                <div className='px-2 pt-2 pb-3 border shadow-sm w-5'>
                  <div className='text-center pb-1'>
                      <h4>{student.mat}</h4>
                  </div> <hr />
                  <div className='d-flex justify-content-center'>
                    <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                      <div className='d-flex justify-content-center flex-column align-items mt-0'>
                        
                        <h3>Phone         : {student.phone}</h3>
                        <h3>Speciality    : {student.spec}</h3>
                        <h3>Department    : {student.dep}</h3>
                        <h3>Level         : {student.level}</h3>
                        <h3>Birth         : {moment(student.birth).format("DD/MM/YYYY")}</h3>
                        <h3>Place         : {student.place}</h3>
                        <h3>Sex           : {student.sex}</h3>
                        <h3>Registrated on       : {student.regdate}</h3>
                        
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>
            <div className='d-flex justify-content-center mt-1 mb-2'>
              <button className='btn btn-primary me-2'>Edit</button>
              <button className='btn btn-warning' onClick={handlelogout}>Logout</button>
              
            </div>
            
        </div>
    </div>
   
  )
}

export default Student