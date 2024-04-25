import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Department() {

  const [value, setValue] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/department')
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
        <Link to='/adddepartment' className='btn btn-success'>+ Add department</Link>
        <hr />
       <div className='mt-3 px-1 ms-1 '>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Action</th>
              

            </tr>
          </thead>
          <tbody>
            {
              value.map( sp =>(
                <tr>
                  <td>{sp.codep}</td>
                  <td>{sp.title}</td>
                  <td>
                    <Link to={'/editdep/'+sp.codep} className='btn btn-info btn-sm me-2 bi-pencil-square'></Link>
                    <Link className='btn btn-danger btn-sm bi-trash'></Link>
                  </td>
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

export default Department