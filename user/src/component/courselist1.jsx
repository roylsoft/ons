import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Courselist1() {

  const [value, setValue] = useState([])
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get('http://localhost:3001/auth/courselist')
    .then(result=>{
        setValue(result.data.Result)
    }).catch(err=>console.log(err))
  },[])

  return (
    <main className='main-container'>
       <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Courses list</h3>
        </div>
        <hr />
        <div class="col-5 mx-3 mt-1 mb-2">
          <input type="text" class="form-control"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by Branch, Code ,Title or Lecturer ..." />
        </div>
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
              <th>Phone</th>
              <th>Branch</th>
              
            </tr>
          </thead>
          <tbody>
            {
              value.filter(item => search.toLowerCase() === "" ||
              item.title.toLowerCase().includes(search) ||
              item.code.toLowerCase().includes(search) ||
              item.name?.toLowerCase().includes(search) ||
              item.branch.toLowerCase().includes(search)).map( sp =>(
                <tr>
                  <td>{sp.code}</td>
                  <td>{sp.title}</td>
                  <td>{sp.credit}</td>
                  <td>{sp.spec}</td>
                  <td>{sp.level}</td>
                  <td>{sp.semester}</td>
                  <td>{sp.type}</td>
                  <td>{sp.name}</td>
                  <td>{sp.phone}</td>
                  <td>{sp.branch}</td>
                  
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

export default Courselist1