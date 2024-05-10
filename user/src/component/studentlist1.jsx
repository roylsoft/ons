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
    const [values, setValues] = useState({
        spec: "",
        level: ""
    })


    const [speciality, setSpeciality] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setorder] = useState("ASC");

    const sortStudent = async () => {
        const url = 'http://localhost:3000/student/studentsort/data'
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

    useEffect(() => {
        axios.get('http://localhost:3000/auth/specialities')
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
                        <div class="col">
                            <p><h5>Choose the list to display :</h5></p>
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
                <hr />
                <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', marginTop: '8%' }}>
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            <p>REPUBLIC OF CAMEROON <br /><i>Peace-Work-Fatherland</i> <br />***** <br />MINISTRY OF HIGHER EDUCATION<br />*****<br />UNIVERSITY OF BAMENDA <br /> <i>Training - Pobity - Entrepreneurship</i></p>
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <img src={'http://localhost:3000/image/Screenshot_20240323-102722 (1).png'} alt="" className='logo' />
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
                                            {/* <td> <img src={'http://localhost:3000/image/' + st.pic} alt="" className='profile_pic' /> </td> */}
                                            <td>{st.mat}</td>
                                            <td >{st.name}</td>
                                            <td>{st.email}</td>
                                            {/* <td>{st.phone}</td> */}
                                            <td >{st.sex}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>

                <div class="d-md-flex justify-content-md-end">
                    <button type='submit' className='btn btn-success' onClick={generatePdf}>
                        <FiPrinter className='card_icon' /> Download PDF
                    </button>
                </div>
            </div>
        </main>

    )

}

export default Studentprint1