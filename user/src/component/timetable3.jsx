import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Timetable3() {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState("");
  const [speciality, setSpeciality] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/specialities')
      .then(result => {
        if (result.data.readingStatus) {
          setSpeciality(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const [values, setValues] = useState({
    spec: "",
    semester: "",
    level: ""
  });

  const timetable = async () => {
    const url = 'http://localhost:3001/auth/timetable/data';
    axios.get(url, { params: { spec: values.spec, semester: values.semester, level: values.level } })
      .then(result => {
        if (result.data.readingStatus) {
          setValue(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    timetable();
  };

  const handleCellChange = async (code, field, value) => {
    try {
        const valeur=value
        const colone=field
        console.log(colone+" "+valeur);
      // Mettre à jour la valeur dans la base de données MySQL via une requête API
      await axios.put(`http://localhost:3001/auth/updatecourse/${code}`, { colone, valeur });

      // Mettre à jour les données localement
      setValue(prevValue =>
        prevValue.map(item =>
          item.code === code ? { ...item, [field]: value } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className='main-container'>
      <div className='px-2 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Courses list</h3>
        </div>
        <div class="row mt-1 mb-2">
        <form action="" onSubmit={handleSubmit}>
          <div class="row mt-1 mb-2">
            <div class="col">
              <p><h5>Choose the list to display :</h5></p>
            </div>
            
            <div class="col">
                <select type='select' name="spec" onChange={(e)=>setValues({...values,spec:e.target.value})} className='form-control'>
                    <option value="">-- Select speciality/field--</option>
                    {speciality.map(sp => (
                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                    ))}
                </select>
              
            </div>
            <div class="col">
              <select type="select" onChange={(e)=>setValues({...values,level:e.target.value})} name='level' autoComplete='off' placeholder='choose your level' className='form-control'>
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
            <div class='col'>
                <select type="select" value={values.semester} onChange={(e)=>setValues({...values,semester:e.target.value})} name='semester' autoComplete='off' placeholder='choose semester' className='form-control rounded-0'>
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
                </select>
            </div>
            <div class="col"> <button type='submit' className='secondary-button'>Display</button></div>
          </div>
          </form>
          <div class="col mt-1 mb-2">
              <p><h5>Enter a word to locate a specific student: </h5></p>
          </div>

          <div class="col mt-1 mb-2">
            <input type="text" class="form-control"
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."/>
          </div>

          <div class="col mt-1 mb-2">
              <p><h5>Clik to register a new student: </h5></p>
          </div>
          <div class="col"><Link to='/addstudent' className='secondary-button'>Edit the time table</Link></div>
        </div>
        <hr />
        <div className='mt-3  ms-1 '>
          <Table striped bordered hover variant="dark" responsive>
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th className='bi-sort-up-alt' onClick={() => sorting("day")}>Day</th>
                <th>period</th>
                <th>Lecturer</th>
              </tr>
            </thead>
            <tbody>
              {value
                .filter(item => search.toLowerCase() === "" || item.spec.toLowerCase().includes(search))
                .map(sp => (
                  <tr key={sp.code}>
                    <td>{sp.code}</td>
                    <td>{sp.title}</td>
                    <td>
                      <input
                        type="text"
                        value={sp.day}
                        onChange={(e) => handleCellChange(sp.code, 'day', e.target.value)}
                        onBlur={(e) => handleCellChange(sp.code, 'day', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={sp.period}
                        onChange={(e) => handleCellChange(sp.code, 'period', e.target.value)}
                        onBlur={(e) => handleCellChange(sp.code, 'period', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={sp.mat}
                        onChange={(e) => handleCellChange(sp.code, 'mat', e.target.value)}
                        onBlur={(e) => handleCellChange(sp.code, 'mat', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </main>
  );
}

export default Timetable3;