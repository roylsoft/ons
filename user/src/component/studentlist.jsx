import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';


function Studentlist() {

  let way = location.pathname
  let words = way.split("/")
  let mat = words.pop();

  const [value, setValue] = useState([])
  const [data, setdata] = useState([])
  const [values, setValues] = useState({
    spec: "",
    level: ""
  })
  const { suite } = useParams()
  const [speciality, setSpeciality] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setorder] = useState("ASC");
  const [route, setsuite] = useState("");



  const sortStudent = async () => {
    const url = 'https://admin-rust-gamma.vercel.app/student/studentsort/data'
    axios.get(url, { params: { spec: values.spec, level: values.level } }
    )
      .then(result => {

        if (result.data.readingStatus) {
          setdata(result.data.Result)

        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sortStudent();
  };

  const handelDelete = (mat) => {
    axios.delete('https://admin-rust-gamma.vercel.app/student/deletestudent/' + mat)
      .then(result => {
        if (result.data.deleteStatus) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }

  useEffect(() => {
    axios.get('https://admin-rust-gamma.vercel.app/auth/specialities')
      .then(result => {
        if (result.data.readingStatus) {
          setsuite(mat)

          setSpeciality(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, [])

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setdata(sorted)
      setorder("DSC")
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setdata(sorted)
      setorder("ASC")
    }
  }

  return (

    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
          <h3>Students list</h3>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div class="row mt-1 mb-2 form-group">


            <div class="col">
              <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })} className='form-control'>
                <option value="">-- Select speciality --</option>
                {speciality.map(sp => (
                  <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                ))}
              </select>
            </div>
            <br />
            <div class="col">
              <select type="select" onChange={(e) => setValues({ ...values, level: e.target.value })} name='level' autoComplete='off' placeholder='choose your level' className='form-control'>
                <option value="">-- Select level--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>

            </div>
            <br />
            <div class="col"> <button type='submit' className='btn btn-success'>Display</button></div>

          </div>
        </form>

        <div class="row mt-1 mb-2">


          <div class="col-5 mx-3 mt-1 mb-2">
            <input type="text" class="form-control"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student..." />
          </div>

          
          <div class="col"><Link to={`/addstudent/${route}`} className='btn btn-success'>+ Add student</Link></div>
        </div>

        <div className='mt-2 ms-1 '>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Matricule</th>
                <th className='bi-sort-up-alt' onClick={() => sorting("name")}>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Birth</th>
                <th>Place</th>
                <th className='bi-filter' onClick={() => sorting("sex")}>Sex</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.filter(item => {
                  return search.toLowerCase() === "" ?
                    item : item.mat.toLowerCase().includes(search) ||
                    item.name.toLowerCase().includes(search)
                }).map(st => (
                  <tr>
                    <td> <img src={'https://admin-rust-gamma.vercel.app/' + st.pic} alt="" className='profile_pic' /> </td>
                    <td>{st.mat}</td>
                    <td >{st.name}</td>
                    <td>{st.email}</td>
                    <td>{st.phone}</td>

                    <td>{moment(st.birth).format("YYYY/MM/DD")}</td>
                    <td>{st.place}</td>
                    <td >{st.sex}</td>

                    <td>
                      <Link to={`/editstudent/${route}/` + st.mat} className='btn btn-info btn-sm me-2 bi-pencil-square'></Link>
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

export default Studentlist