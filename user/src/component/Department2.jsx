import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Department2() {

  const [value, setValue] = useState([])

  useEffect(()=>{
    axios.get('https://server-six-bice.vercel.app/auth/department')
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
            <h3>Departments</h3>
        </div>
        <hr />
       <div className='mt-3 px-1 ms-1 '>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
            
              

            </tr>
          </thead>
          <tbody>
            {
              value.map( sp =>(
                <tr>
                  <td>{sp.codep}</td>
                  <td>{sp.title}</td>
                  
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

export default Department2