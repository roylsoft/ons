import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

function Assignmark() {
  const [speciality, setSpeciality] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(40);
  const [searchTerm, setSearchTerm] = useState('');
  const [editedValues, setEditedValues] = useState({});
  const [data, setdata] = useState([]);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState({
    spec: "",
    semester: "",
    session: "CA",
    level: ""
  })
  let loc = location.pathname
  let mat = loc.replace(/^\/assigncamarks\//, "")
  console.log(mat);
  const sortMark = async () => {
    const url = 'http://localhost:3000/auth/sortmark/data';
    try {
      const response = await axios.get(url, {
        params: {
          spec: values.spec,
          session: values.session,
          semester: values.semester,
          level: values.level,
          page: currentPage,
          perPage: perPage,
          search: search,
          mat: mat,
        },
      });
      console.log("mat :" + mat);
      console.log(response.data);
      console.log(response.data.result);
      const result = Array.isArray(response.data.result) ? response.data.result : Array.from(response.data.result);
      setdata(result);
      const dynamicColumns = Object.keys(result[0] || {}).map((key) => ({
        name: key,
        selector: key,
        editable: true,
      }));
      setColumns(dynamicColumns);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sortMark();
  };

  useEffect(() => {
    axios.get('http://localhost:3000/auth/specialities')
      .then(result => {
        if (result.data.readingStatus) {
          setSpeciality(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }, []);


  const handlechange = (e, index, rowindex, newvalue) => {
    e.preventDefault();

    let rowData = data[rowindex];
    let keys = Object.keys(rowData);
    let colName = keys[0];
    let matetud = rowData[colName]
    console.log(matetud);

    if (index === 0 || index === 1) {

      console.log("Error on :" + index);
    } else {
      const updatedRow = data[rowindex];
      console.log("Updated row:", updatedRow);
      const url = 'http://localhost:3000/auth/lectupdatemark/inf';
      axios
        .get(url, {
          params: {
            spec: values.spec,
            session: values.session,
            rowindex: rowindex,
            index: index,
            newvalue: newvalue,
            mat: mat,
            level: values.level,
            semester: values.semester,
            etudiant: matetud
          },
        })
        .then((result) => {
          if (result.data.readingStatus) {
            console.log(result.data.result);
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    }

  };

  const handleInputChange = (e, rowindex, key) => {
    const { value } = e.target;
    const updatedData = [...data];
    updatedData[rowindex][key] = value;
    setdata(updatedData);
  };


  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>

          <div class="row mt-1 mb-2">

            <div class="col mt-1 mb-2">
              <p><h5>Marks list ==== </h5></p>
            </div>
            <div class="col mt-1 mb-2">
              <p><h5>Speciality: </h5></p>
            </div>

            <div class="col mt-1 mb-2">
              <input type="text" class="form-control bg-info"
                value={values.spec}
              />
            </div>

            <div class="col mt-1 mb-2">
              <p><h5>Level: </h5></p>
            </div>
            <div class="col mt-1 mb-2">
              <input type="text" class="form-control bg-primary"
                value={values.level}
              />
            </div>
            <div class="col mt-1 mb-2">
              <p><h5>Session: </h5></p>
            </div>
            <div class="col mt-1 mb-2">
              <input type="text" class="form-control bg-light"
                value={values.session}
              />
            </div>
            <div class="col mt-1 mb-2">
              <p><h5>semester: </h5></p>
            </div>
            <div class="col mt-1 mb-2">
              <input type="text" class="form-control bg-warning"
                value={values.semester}
              />
            </div>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div class="row mt-1 mb-2">
            <div class="col">
              <p><h5>Choose the list to display:</h5></p>
            </div>

            <div class="col">
              <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })} className='form-control'>
                <option value="">-- Select speciality/field--</option>
                {speciality.map(sp => (
                  <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                ))}
              </select>

            </div>
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

            {/* <div class="col">
              <select type="select" onChange={(e) => setValues({ ...values, session: e.target.value })} name='session' autoComplete='off' placeholder='choose your session' className='form-control'>
                <option value="">-- Select session--</option>
                <option value="CA">CA</option>
                <option value="EXAM">EXAM</option>

              </select>

            </div> */}
            <div class="col">
              <select type="select" onChange={(e) => setValues({ ...values, semester: e.target.value })} name='semester' autoComplete='off' placeholder='choose your semester' className='form-control'>
                <option value="">-- Select semester--</option>
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
            <div class="col"> <button type='submit' className='btn btn-success'>Display</button></div>

          </div>
        </form>
        <div class="row mt-1 mb-2">

          <div class="col mt-1 mb-2">
            <p><h5>Enter a word to locate a specific student: </h5></p>
          </div>

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
                          onBlur={(e) => handlechange(e, index, rowindex, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className='btn btn-primary me-md-2' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            <button className='btn btn-info' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>

        </div>
      </div>
    </main>
  )

}
export default Assignmark;