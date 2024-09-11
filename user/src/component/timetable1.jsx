import React, { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

function Timetable1() {

    const [value, setValue] = useState([])
    const [search, setSearch] = useState("");
    const [speciality, setSpeciality] = useState([]);
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


    const [values, setValues] = useState({
        spec: "",
        semester: "",
        level: ""
    })
    const timetable = async () => {
        const url = 'http://localhost:3001/auth/timetable/data'
        axios.get(url, { params: { spec: values.spec, semester: values.semester, level: values.level } }
        )
            .then(result => {

                if (result.data.readingStatus) {
                    setValue(result.data.Result)

                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        timetable();
    };

    const pdf = useRef()

    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'timetable',
        onAfterPrint: () => alert('timetable saved successfully'),

    })

    return (
        <main className='main-container'>
            <div className='px-2 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Time table</h3>
                </div>
                <div class="row mt-1 mb-2">
                    <form action="" onSubmit={handleSubmit}>
                        <div class="row mt-1 mb-2 form-group">

                            <div class="col">
                                <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })} className='form-control'>
                                    <option value="">-- Select speciality/field--</option>
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
                            <div class='col'>
                                <select type="select" value={values.semester} onChange={(e) => setValues({ ...values, semester: e.target.value })} name='semester' autoComplete='off' placeholder='choose semester' className='form-control'>
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
                            <br />
                            <div class="col"> <button type='submit' className='secondary-button'>Display</button></div>
                        </div>
                    </form>


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
                    <div class='d-flex justify-content-center'>
                        <p><h5>Time table </h5></p>
                    </div>
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
                            <div class="col mt-1 mb-2">
                                <p><h5>Semester: </h5></p>
                            </div>
                            <div class="col mt-1 mb-2">
                                <input type="text" class="form-control"
                                    value={values.semester}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="col-5 mx-3 mt-1 mb-2">
                        <input type="text" class="form-control"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter by Branch, Code ,Title or Lecturer ..." />
                    </div>
                    <hr />

                    <div className='mt-3  ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Course code</th>
                                    <th>Title</th>
                                    <th className='bi-sort-up-alt' onClick={() => sorting("day")}>Day</th>
                                    <th>period</th>
                                    <th>Lecturer</th>
                                    <th>Branch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.filter(item => search.toLowerCase() === "" ||
                                    item.title.toLowerCase().includes(search) ||
                                    item.code.toLowerCase().includes(search) ||
                                    item.name?.toLowerCase().includes(search) ||
                                    item.branch.toLowerCase().includes(search)).map(sp => (
                                        <tr>
                                            <td>{sp.code}</td>
                                            <td>{sp.title}</td>
                                            <td>{sp.day}</td>
                                            <td>{sp.period}</td>
                                            <td>{sp.name}</td>
                                            <td>{sp.branch}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <div class="d-md-flex justify-content-md-end">
                <button type='submit' className='secondary-button' onClick={generatePdf}>
                    <FiPrinter className='card_icon' /> Download PDF
                </button>
            </div>
        </main>


    )
}

export default Timetable1