import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';


function Staff1() {
  const [value, setValue] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3001/auth/staff')
    .then(result=>{
      if (result.data.readingStatus) {
        setValue(result.data.Result)
      }else{
        alert(result.data.Error)
      }
    }).catch(err=>console.log(err))
  },[])

  const handelDelete = (mat) => {
    axios.delete('http://localhost:3001/auth/deletestaff/'+mat)
    .then(result => {
      if(result.data.deleteStatus){
        window.location.reload()
      }else{
        alert(result.data.Error)
      }
    })
  }
      

  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>My colleagues</h3>
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
              <th>Branch</th>
            
            </tr>
          </thead>
          <tbody>
            {
              value.sort((a, b) => a.name.localeCompare(b.name)).map( st =>(
                <tr>
                  <td><img src={'https://server.nfonap.com/' +st.pic} alt="" className='profile_pic' /> </td>
                 
                  <td>{st.name}</td>
                  <td>{st.email}</td>
                  <td>{st.phone}</td>
                  <td>{st.sex}</td>
                  <td>{st.branch}</td>
                 
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

export default Staff1