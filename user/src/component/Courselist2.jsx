import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Courselist2() {

  const [value, setValue] = useState([])

  useEffect(()=>{
    axios.get('https://server-six-bice.vercel.app/auth/courselist')
    .then(result=>{
        setValue(result.data.Result)
    }).catch(err=>console.log(err))
  },[])

  const handelDelete = (code) => {
    axios.delete('https://server-six-bice.vercel.app/auth/deletecourse/'+code)
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
            <h3>Courses list</h3>
        </div>
        <hr />
       <div className='mt-3  ms-1 '>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Credit</th>
              <th>Specialisaty</th>
              <th>Level</th>
              <th>Semester</th>
              <th>Type</th>
              <th>Lecturer</th>
           
            </tr>
          </thead>
          <tbody>
            {
              value.map( sp =>(
                <tr>
                  <td>{sp.code}</td>
                  <td>{sp.title}</td>
                  <td>{sp.credit}</td>
                  <td>{sp.spec}</td>
                  <td>{sp.level}</td>
                  <td>{sp.semester}</td>
                  <td>{sp.type}</td>
                  <td>{sp.mat}</td>
                  
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

export default Courselist2