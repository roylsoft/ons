import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';


function Attendance() {
  const [value, setValue] = useState([])
  const [data, setdata] = useState([])
  const [values, setValues] = useState({
    spec: "",
    month: "",
    branch: ""
  })

  const [speciality, setSpeciality] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setorder] = useState("ASC");

  const attendance = async () => {
    const url = 'http://localhost:3001/auth/attendance/data'
    axios.get(url, { params: { spec: values.spec, month: values.month, branch: values.branch } }
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
    attendance();
  };

  useEffect(() => {
    axios.get('http://localhost:3001/auth/specialities')
      .then(result => {
        if (result.data.readingStatus) {
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
          <h3>Lecturers Attendances</h3>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div class="row mt-1 mb-2">


            <div class="form-group mb-3">
              <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })} className='form-control'>
                <option value="">-- speciality/field --</option>
                {speciality.map(sp => (
                  <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                ))}
              </select>

              <select type="select" onChange={(e) => setValues({ ...values, month: e.target.value })} name='month' autoComplete='off' placeholder='choose your level' className='form-control'>
                <option value="">-- Month --</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">Jun</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <label htmlFor="branch"><strong>Branch<span className='start'>*</span></strong></label>
              <select type="select" onChange={(e) => setValues({ ...values, branch: e.target.value })}
                name='branch' autoComplete='off' placeholder='choose your branch' className='form-control rounded-2'>
                <option value="">-- Select  the branch--</option>
                <option value="Madagascar">Madagascar(Main)</option>
                <option value="Odza">Odza</option>
                <option value="Olembe">Olembe</option>
                <option value="Ngousso">Ngousso</option>
                <option value="Bafia">Bafia</option>
                <option value="Maroua">Maroua</option>
                <option value="Foumbot">Foumbot</option>
                <option value="Nkambe">Nkambe</option>
                <option value="Douala">Douala</option>
              </select>
            
            </div>

            <div class="d-flex"> <button type='submit' className='secondary-button'>Display</button></div>

          </div>
        </form>

        <div class="row mt-1 mb-2">



          <div class="col mt-1 mb-2">
            <input type="text" class="form-control"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..." />
          </div>
        </div>

        <div className='mt-2 ms-1 '>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Lecturer ID</th>
                <th className='bi-sort-up-alt' onClick={() => sorting("day")}>Day</th>
                <th>Period</th>
                <th>Course</th>
                <th>Level</th>
                <th>T.Hours</th>
                <th>Approver</th>
              </tr>
            </thead>
            <tbody>
              {
                data.filter(item => {
                  return search.toLowerCase() === "" ?
                    item : item.lecturer.toLowerCase().includes(search) ||
                    item.code.toLowerCase().includes(search)
                }).map(st => (
                  <tr>
                    <td>{st.lecturer}</td>
                    <td>{moment(st.day).format("YYYY-MM-DD")}</td>
                    <td>{st.period}</td>
                    <td>{st.code}</td>
                    <td>{st.level}</td>
                    <td >{st.hour}</td>
                    <td >{st.sign}</td>
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

export default Attendance