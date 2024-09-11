import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';
import { FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';



function Studentprint1() {
    const [value, setValue] = useState([])
    const [data, setdata] = useState([])
   
    const [speciality, setSpeciality] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setorder] = useState("ASC");

    const handleSubmit = (event) => {
        event.preventDefault();
        sortStudent();
    };

    const [values, setValues] = useState({
        spec: "",
        level: "",
        branch: "",
        year: ""
      })
      
      const sortStudent = async () => {
      
        const url = 'http://localhost:3001/auth/studentsort/data'
        axios.get(url, { params: { spec: values.spec, level: values.level, branch: values.branch, year: values.year } }
        )
          .then(result => {
    
            if (result.data.readingStatus) {
         
              setdata(result.data.Result)
            } else {
              alert(result.data.Error)
            }
          }).catch(err => console.log(err))
    
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
    const pdf = useRef()

    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'student\'s list',
        onAfterPrint: () => alert('student\'s list saved successfully'),

    })

    return (
        <main className='main-container'>
            <div className='px-2 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Students list</h3>
                </div>
                <form action="" onSubmit={handleSubmit}>
          <div class="row mt-1 mb-2">
            <div className='mb-3 form-group'>
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

              <label htmlFor="year"><strong>Academic year<span className='start'>*</span></strong></label>
              <select type="select" onChange={(e) => setValues({ ...values, year: e.target.value })}
                name='year' autoComplete='off' placeholder='academic year' className='form-control rounded-2'>
                <option value="">-- Select --</option>
                <option value="2024_2025">2024/2025</option>
                <option value="2025_2026">2025/2026</option>
                <option value="2026_2027">2026/2027</option>
                <option value="2027_2028">2027/2028</option>
                <option value="2028_2029">2028/2029</option>
              </select>

            </div>


            <div class="form-group mb-2">
              <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })} className='form-control'>
                <option value="">-- Select speciality --</option>
                {speciality.map(sp => (
                  <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                ))}
              </select>

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
            <div class="col"> <button type='submit' className='secondary-button'>Display</button></div>

          </div>
        </form>

                <div class="row mt-1 mb-2">


                    <div class="col-5 mx-3 mt-1 mb-2">
                        <input type="text" class="form-control"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter by Matricule, Title , Name or Banch..." />
                    </div>
                </div>
                <hr />
                <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', marginTop: '8%' }}>
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            <p>REPUBLIC OF CAMEROON <br /><i>Peace-Work-Fatherland</i> <br />***** <br />MINISTRY OF HIGHER EDUCATION<br />*****<br />UNIVERSITY OF BAMENDA <br /> <i>Training - Pobity - Entrepreneurship</i></p>
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <img src={'../../public/home-banner-image-MzdQIPbC.png'} alt="" className='logo' />
                        </div>
                        <div class="col-5 d-flex justify-content-center">
                            <p>NFONAP-HIEPS<br /><i>Training-development-expertise</i><br />*****<br />The Dean's Office <br />***** <br />P.O Box:2368 Messa-Yaounde <br />E-mail: <u>info@nfonap.education</u> <br />Registration: <u>www.nfonap.net</u><br />website: <u>www.nfonap.education</u> <br />Tel: <u>675550570 / 672545135</u></p>
                        </div>
                    </div>
                    <hr />
                    <div class='d-flex justify-content-center'>
                        <div class="row mt-1 mb-2">
                            <div class="col mt-1 mb-2">
                                <p><h5>Speciality: </h5></p>
                            </div>
                            <div class="col mt-1 mb-2">
                                <input type="text" class="form-control "
                                    value={values.spec}
                                />
                            </div>
                            <div class="col mt-1 mb-2">
                                <p><h5>Level: </h5></p>
                            </div>
                            <div class="col mt-1 mb-2">
                                <input type="text" class="form-control"
                                    value={values.level}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-5 mx-3 mt-1 mb-2">
                        <input type="text" class="form-control"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter by Matricule, Title , Name or Banch..." />
                    </div>
                    <div className='mt-2 ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    {/* <th>Picture</th> */}
                                    <th>Matricule</th>
                                    <th className='bi-sort-up-alt' onClick={() => sorting("name")}>Name</th>
                                    <th>Email</th>
                                    {/* <th>Phone</th> */}
                                    <th className='bi-filter' onClick={() => sorting("sex")}>Sex</th>
                                    <th>Branch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.filter(item => search.toLowerCase() === "" ||
                                        item.mat.toLowerCase().includes(search) ||
                                        item.email.toLowerCase().includes(search) ||
                                        item.name?.toLowerCase().includes(search) ||
                                        item.branch?.toLowerCase().includes(search)).sort((a, b) => a.name.localeCompare(b.name)).map(st => (
                                            <tr>
                                                {/* <td><img src={'https://server.nfonap.com/' + st.pic} alt="" className='profile_pic' /> </td> */}
                                                <td>{st.mat}</td>
                                                <td >{st.name}</td>
                                                <td>{st.email}</td>
                                                {/* <td>{st.phone}</td> */}
                                                <td >{st.sex}</td>
                                                <td >{st.branch}</td>
                                            </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>

                <div class="d-md-flex justify-content-md-end">
                    <button type='submit' className='secondary-button' onClick={generatePdf}>
                        <FiPrinter className='card_icon' /> Download PDF
                    </button>
                </div>
            </div>
        </main>

    )

}

export default Studentprint1