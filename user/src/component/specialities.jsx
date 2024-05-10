import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Specialities() {

  const [value, setValue] = useState([])
  
  const [route, setsuite] = useState("");
  let way = location.pathname
  let words = way.split("/")
  let code = words.pop();


  useEffect(() => {
    axios.get('https://admin-rust-gamma.vercel.app/auth/specialities')
      .then(result => {
        setsuite(code)
        setValue(result.data.Result)



      }).catch(err => console.log(err))
  }, [])
  const handelDelete = (codesp) => {
    axios.delete('https://admin-rust-gamma.vercel.app/auth/deletespeciality/' + codesp)
      .then(result => {
        if (result.data.deleteStatus) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }

  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
          <h3>Specialities</h3>
        </div>
        <Link to={`/addspeciality/${route}`} className='btn btn-success'>+ Add speciality</Link>
        <div className='mt-3 ms-1 '>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Department</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {
                value.map(sp => (
                  <tr>
                    <td>{sp.codesp}</td>
                    <td>{sp.title}</td>
                    <td>{sp.codep}</td>
                    <td>
                      <Link to={`/editspec/${route}/` + sp.codesp} className='btn btn-info btn-sm me-2 bi-pencil-square'></Link>
                      <Link className='btn btn-danger btn-sm bi-trash' onClick={() => handelDelete(sp.codesp)}></Link>
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

export default Specialities