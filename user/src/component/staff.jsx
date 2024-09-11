import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';


function Staff() {
  const [value, setValue] = useState([])
  const [route, setsuite] = useState("");
  let way = location.pathname
  let words = way.split("/")
  let mat = words.pop();

  useEffect(() => {
    axios.get('http://localhost:3001/auth/staff')
      .then(result => {
        if (result.data.readingStatus) {
          setsuite(mat)
          setValue(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  const handelDelete = (mat) => {
    axios.delete('http://localhost:3001/auth/deletestaff/' + mat)
      .then(result => {
        if (result.data.deleteStatus) {
          console.log(result);
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }
  const url = 'http://localhost:3001/auth/verifkey';
  const title = 'Thank you joinig nfonap_hieps';
  const description = 'Please create your acount in our system!';

  const [search, setSearch] = useState("");
  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
          <h3>Our Lecturers</h3>
        </div>
        <Link to={`/addstaff/${route}`} className='secondary-button'>+ Add staff</Link>    or share the creation link
        <WhatsappShareButton url={url} title={title} separator=" - " description={description}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <div class="col-5 mx-3 mt-1 mb-2">
            <input type="text" class="form-control"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by Matricule, Title , Name or Banch..." />
          </div>
        <div className='mt-2 ms-1 '>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Matricule</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Grade</th>
                <th>Birth</th>
                <th>Place</th>
                <th>Sex</th>
                <th>ID card</th>
                <th>Pay/hour</th>
                <th>Branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                value.filter(item => search.toLowerCase() === "" ||
                item.mat.toLowerCase().includes(search) ||
                item.email.toLowerCase().includes(search) ||
                item.name?.toLowerCase().includes(search) ||
                item.branch?.toLowerCase().includes(search)).sort((a, b) => a.name.localeCompare(b.name)).map(st => (
                  <tr>
                    <td><img src={'https://server.nfonap.com/' + st.pic} alt="" className='profile_pic' /> </td>
                    <td>{st.mat}</td>
                    <td>{st.name}</td>
                    <td>{st.codep}</td>
                    <td>{st.email}</td>
                    <td>{st.phone}</td>
                    <td>{st.grade}</td>
                    <td>{moment(st.birth).format("YYYY-MM-DD")}</td>
                    <td>{st.place}</td>
                    <td>{st.sex}</td>
                    <td>{st.idcard}</td>
                    <td>{st.coasthour}</td>
                    <td>{st.branch}</td>
                    <td>
                      <Link to={`/editstaff/${route}/` + st.mat} className='btn btn-info bi-pencil-square btn-sm me-2'></Link>
                      <Link className='btn btn-danger btn-sm bi-trash' onClick={() => handelDelete(st.mat)}></Link>
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

export default Staff