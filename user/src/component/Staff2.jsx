import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';


function Staff2() {
  const [value, setValue] = useState([])

  useEffect(()=>{
    axios.get('https://admin-rust-gamma.vercel.app/staff/staff')
    .then(result=>{
      if (result.data.readingStatus) {
        setValue(result.data.Result)
      }else{
        alert(result.data.Error)
      }
    }).catch(err=>console.log(err))
  },[])
      

  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Our Lecturers</h3>
        </div>
        <hr />
       <div className='mt-2 ms-1 '>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Picture</th>
             
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
             
              <th>Sex</th>
            
            </tr>
          </thead>
          <tbody>
            {
              value.map( st =>(
                <tr>
                  <td> <img src={'https://admin-rust-gamma.vercel.app/' +st.pic} alt="" className='profile_pic' /> </td>
                  
                  <td>{st.name}</td>
                  <td>{st.email}</td>
                  <td>{st.phone}</td>
                  <td>{st.sex}</td>
                  
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

export default Staff2