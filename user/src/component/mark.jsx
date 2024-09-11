import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Mark() {
  const [speciality, setSpeciality] = useState([]);
  const [search, setSearch] = useState("");
  const [data, setdata] = useState([]);
  const [values, setValues] = useState({
    branch: "",
    year: "",
    spec: "",
    semester: "",
    session: "",
    cle: "",
    level: ""
  })

  const sortMark = async () => {
    // const k = "1910sourceeva1606"
    // const k1 = "1910sourceVally1606"
    // if (values.cle === k || values.cle === k1) {
      const url = 'http://localhost:3001/auth/marksort/data';
      try {
        const response = await axios.get(url, {
          params: {
            branch: values.branch,
            year: values.year,
            spec: values.spec,
            session: values.session,
            semester: values.semester,
            level: values.level
          },
        });

        const result = Array.isArray(response.data.result) ? response.data.result : Array.from(response.data.result);
        setdata(result);
      } catch (error) {
        console.log(error);
      }
    // } else {
    //   alert("Sorry you are not allowed to access this session!")
    // }

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sortMark();
  };

  useEffect(() => {
    axios.get('http://localhost:3001/auth/specialities')
      .then(result => {
        if (result.data.readingStatus) {
          setSpeciality(result.data.Result)
        }
      }).catch(err => console.log(err))
  }, []);

  const handleInputChange = (e, rowindex, key) => {
    const { value } = e.target.value;
    const updatedData = [...data];
    updatedData[rowindex][key] = value;
    setdata(updatedData);
    if (rowindex === null || key === null) {
      console.log("Error on :" + index);
    } else {
      const url = 'http://localhost:3001/auth/updatemark/inf';
      axios
        .get(url, {
          params: {
            branch: values.branch,
            year: values.year,
            spec: values.spec,
            session: values.session,
            colone: key,
            newvalue: e.target.value,
            etudiant: data[rowindex].mat1
          },
        })
        .then((result) => {
          if (result.data.readingStatus) {

          }
        })
        .catch((err) => console.log(err));
    }


  };



  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <form action="" onSubmit={handleSubmit}>
          <div class="row mt-1 mb-2 form-group">
            <div class="col">
              <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })} className='form-control'>
                <option value="">--Speciality--</option>
                {speciality.map(sp => (
                  <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                ))}
              </select>

            </div>
            <div class="col">
              <select type="select" onChange={(e) => setValues({ ...values, level: e.target.value })} name='level' autoComplete='off' placeholder='choose your level' className='form-control'>
                <option value="">--level--</option>
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

            <div class="col">
              <select type="select" onChange={(e) => setValues({ ...values, session: e.target.value })} name='session' autoComplete='off' placeholder='choose your session' className='form-control'>
                <option value="">--Session--</option>
                <option value="CA">CA</option>
                <option value="EXAM">EXAM</option>

              </select>

            </div>
            <div class="col mb-2">
              <select type="select" onChange={(e) => setValues({ ...values, semester: e.target.value })} name='semester' autoComplete='off' placeholder='choose your semester' className='form-control'>
                <option value="">--Semester--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
              </select>

            </div>
          </div>
          <div class="form-group">
            <select type="select" onChange={(e) => setValues({ ...values, branch: e.target.value })}
              name='branch' autoComplete='off' placeholder='choose your branch' className='form-control rounded-2'>
              <option value="">-- Select  the Branch--</option>
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
            <select type="select" onChange={(e) => setValues({ ...values, year: e.target.value })}
              name='year' autoComplete='off' placeholder='academic year' className='form-control rounded-2'>
              <option value="">-- Academic year --</option>
              <option value="2024_2025">2024/2025</option>
              <option value="2025_2026">2025/2026</option>
              <option value="2026_2027">2026/2027</option>
              <option value="2027_2028">2027/2028</option>
              <option value="2028_2029">2028/2029</option>
            </select>
            <div class="d-flex justify-content-md-end"> <button type='submit' className='btn d-end'>Display</button></div>
          </div>

        </form>
        <div class="row mt-1 mb-2">


          <div class="col-4 mt-1 mb-2">
            <input type="text" class="form-control"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Student..." />
          </div>

          <div class="col mt-1 mb-2">
            {/* <p><h5>Clik to register a new student: </h5></p> */}
          </div>
          {/* <div class="col"><Link to='/addstudent' className='secondary-button'>+ Add student</Link></div> */}
        </div>
        <hr />
        <div className='mt-2 ms-1 '>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((column, colindex) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => {
                  return search.toLowerCase() === "" ? item : item.mat1.toLowerCase().includes(search);
                })
                .map((row, rowindex) => (
                  <tr key={rowindex}>
                    {Object.entries(row).map(([key, value], index) => (
                      <td key={index}>
                        <input class="form-control"
                          type="text"
                          value={value}
                          onChange={(e) => handleInputChange(e, rowindex, key)}
                          onBlur={(e) => handleInputChange(e, rowindex, key)}
                        />
                      </td>
                    ))}
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
export default Mark;
