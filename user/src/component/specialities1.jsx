import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Specialities1() {

  const [value, setValue] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/specialities')
    .then(result=>{
     
        setValue(result.data.Result)
     
        
    
    }).catch(err=>console.log(err))
  },[])
 

  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Specialities</h3>
        </div>
        <hr />
       <div className='mt-3 ms-1 '>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {
              value.map( sp =>(
                <tr>
                  <td>{sp.codesp}</td>
                  <td>{sp.title}</td>
                  <td>{sp.codep}</td>
                  
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

export default Specialities1