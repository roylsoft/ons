import React, { useRef, useEffect, useState } from 'react'
import { Link, generatePath, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useReactToPrint } from 'react-to-print'
import { FiPrinter } from "react-icons/fi";
import moment from 'moment';


function Trancript2() {

    const pdf = useRef()
    const { param } = useParams()
    console.log(param);
    const [semester1, setsemester1] = useState([])
    const [semester2, setsemester2] = useState([])
    const [values, setValues] = useState({
        mat: ""
    })

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const [student, setStudent] = useState([])

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [randomNumber, setRandomNumber] = useState(null);
    const generateRandomNumber = () => {
        const min = 100;
        const max = 9999;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(randomNum);
    };
    const [cycle, setcycle] = useState(null)
    const [num, setnum] = useState()
    const handleSubmit = (event) => {
        event.preventDefault()
        sutudentinf()

        axios.post('https://admin-rust-gamma.vercel.app/auth/transcript1', values)
            .then(result => {
                if (result.data) {
                    console.log(result.data.result);
                    const semester = result.data.result
                    const completedata = semester.map(row => ({
                        ...row, avg: parseFloat(row.ca) + parseFloat(row.ns), qm: calculqm(parseFloat(row.ca) + parseFloat(row.ns)),
                        grade: calculgrade(parseFloat(row.ca) + parseFloat(row.ns)), obs: calculobs(parseFloat(row.ca) + parseFloat(row.ns))
                    }))
                    setsemester1(completedata)
                    setSuccess("sucess")

                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))

        axios.post('https://admin-rust-gamma.vercel.app/auth/transcript2', values)
            .then(result => {
                if (result.data) {
                    console.log(result.data.result);
                    const semester = result.data.result
                    const completedata = semester.map(row => ({
                        ...row, avg: parseFloat(row.ca) + parseFloat(row.ns), qm: calculqm(parseFloat(row.ca) + parseFloat(row.ns)),
                        grade: calculgrade(parseFloat(row.ca) + parseFloat(row.ns)), obs: calculobs(parseFloat(row.ca) + parseFloat(row.ns))
                    }))
                    setsemester2(completedata)
                    setSuccess("sucess")
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))

    }
    const matri = values.mat
    const sutudentinf = () => {
        axios.get('https://admin-rust-gamma.vercel.app/student/student/' + matri)
            .then(result => {
                console.log(result.data.Result[0].level);
                setStudent(result.data.Result[0])
                generateRandomNumber()
                const num = "N°" + randomNumber
                setnum(num)
                if (student.level == 1 || student.level == 2) {
                    setcycle("HND")
                    console.log("cycle");
                } else if (student.level == 4 || student.level == 5) {
                    setcycle("Master")
                } else if (student.level == 3) {
                    setcycle("Bachelor")
                } else {
                    setcycle("PhD candidate")
                }

            })
            .catch(err => console.log(err))
    }
    const calculqm = qm => {
        if (80 <= qm) {
            return 4
        } else if (qm >= 75 && qm <= 79) {
            return 3.70
        } else if (qm >= 70 && qm <= 74) {
            return 3.30
        } else if (qm >= 65 && qm <= 69) {
            return 3.00
        } else if (qm >= 60 && qm >= 64) {
            return 2.70
        } else if (qm >= 55 && qm <= 59) {
            return 2.30
        } else if (qm >= 50 && qm <= 54) {
            return 2.00
        } else if (qm >= 45 && qm <= 49) {
            return 1.70
        } else if (qm >= 40 && qm <= 44) {
            return 1.30
        } else if (qm >= 35 && qm >= 39) {
            return 1.00
        } else if (qm >= 30 && qm <= 34) {
            return 0
        } else if (qm >= 0 && qm <= 29) {
            return 0
        }
    }
    const calculgrade = qm => {
        if (80 <= qm) {
            return 'A'
        } else if (qm >= 75 && qm <= 79) {
            return 'A-'
        } else if (qm >= 70 && qm <= 74) {
            return 'B+'
        } else if (qm >= 65 && qm <= 69) {
            return 'B'
        } else if (qm >= 60 && qm >= 64) {
            return 'B-'
        } else if (qm >= 55 && qm <= 59) {
            return 'C+'
        } else if (qm >= 50 && qm <= 54) {
            return 'C'
        } else if (qm >= 45 && qm <= 49) {
            return 'C-'
        } else if (qm >= 40 && qm <= 44) {
            return 'D+'
        } else if (qm >= 35 && qm >= 39) {
            return 'D'
        } else if (qm >= 30 && qm <= 34) {
            return 'E'
        } else if (qm >= 0 && qm <= 29) {
            return 'F'
        }
    }
    const calculobs = qm => {
        if (80 <= qm) {
            return "very good"
        } else if (qm >= 75 && qm <= 79) {
            return "good"
        } else if (qm >= 70 && qm <= 74) {
            return "good"
        } else if (qm >= 65 && qm <= 69) {
            return "f.good"
        } else if (qm >= 60 && qm >= 64) {
            return "f.good"
        } else if (qm >= 55 && qm <= 59) {
            return "pass"
        } else if (qm >= 50 && qm <= 54) {
            return "pass"
        } else if (qm >= 45 && qm <= 49) {
            return "NTCA"
        } else if (qm >= 40 && qm <= 44) {
            return "NTCA"
        } else if (qm >= 35 && qm >= 39) {
            return "NTCA"
        } else if (qm >= 30 && qm <= 34) {
            return "failed"
        } else if (qm >= 0 && qm <= 29) {
            return "eliminated"
        }
    }
    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'transcript',
        onAfterPrint: () => alert('transcript saved successfully'),

    })

    return (

        <main className='main-container'>
            <div className='px-2 mt-3'>
                <div class="row mt-1 mb-2">
                    <form action="" onSubmit={handleSubmit}>
                        <div class="row mt-1 mb-2">
                            <div class="col-4">
                                <p><h5>Generate a student transcript :</h5></p>
                            </div>
                            <div className='mb-3 col-3'>
                                <input type="text" value={param} onChange={(e) => setValues({ ...values, mat: e.target.value })} name='mat' autoComplete='off' placeholder='Student UID' className='form-control rounded-2' />
                            </div>
                            <div class="col-3"> <button type='submit' className='btn btn-success'>Display</button></div>

                        </div>
                    </form>
                </div>
                <hr />
                <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', fontSynthesisWeight:'auto', marginTop: '8%'}} className='pdf'>
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                       
                        <div class="col-5 d-flex justify-content-center">
                            <p>REPUBLIC OF CAMEROON <br /><i>Peace-Work-Fatherland</i> <br />***** <br />MINISTRY OF HIGHER EDUCATION<br />*****<br />UNIVERSITY OF BAMENDA <br /> <i>Training - Pobity - Entrepreneurship</i></p>
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <img src={'https://admin-rust-gamma.vercel.app/image/Screenshot_20240323-102722 (1).png'} alt="" className='logo' />
                        </div>
                        <div class="col-5 d-flex justify-content-center">
                            <p>NFONAP-HIEPS<br /><i>Training-development-expertise</i><br />*****<br />The Dean's Office <br />***** <br />P.O Box:2368 Messa-Yaounde <br />E-mail: <u>info@nfonap.education</u> <br />Registration: <u>www.nfonap.net</u><br />website: <u>www.nfonap.education</u> <br />Tel: <u>675550570 / 672545135</u></p>
                        </div>
                     
                        
                    </div>
                    <hr />
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            Full name: {student.name} <br />
                            Date of birth: {moment(student.birth).format("DD/MM/YYYY")}<br />
                            Place of birth: {student.place} <br />
                            Gender: {student.sex}<br />
                            Student UID : {values.mat}
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <strong><i>ANNUAL TRANSCRIPT</i> <br /> {num}/CM/UBA/NHIEPS/{student.dep}/{student.spec} </strong>
                        </div>
                        <div class="col-5 d-flex justify-content-center">
                            <img src={`https://admin-rust-gamma.vercel.app/image/${student.pic}`}
                                alt="" className='logo' />
                        </div>
                    </div>
                    <hr />
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            Academic Year: {currentYear}/{nextYear} <br />
                            Cycle: {cycle}
                        </div>
                        <div class="col-2 d-flex justify-content-center"> <strong>Class BMD/ Classe LMD : L{student.level}</strong>   </div>
                        <div class="col-5 d-flex justify-content-center">
                            Voie: Professional<br />
                            Mention: {student.dep} <br />
                            Option: {student.spec}
                        </div>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <h6>First semester</h6>
                    </div>
                    <div className='mt-1  ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Title</th>
                                    <th>Credit</th>
                                    <th>CA/30</th>
                                    <th>NS/70</th>
                                    <th>AVG/100</th>
                                    <th>QM</th>
                                    <th>Grade</th>
                                    <th>Obs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    semester1.map(sp => (
                                        <tr>
                                            <td>{sp.code}</td>
                                            <td>{sp.title}</td>
                                            <td>{sp.credit}</td>
                                            <td>{sp.ca}</td>
                                            <td>{sp.ns}</td>
                                            <td>{sp.avg}</td>
                                            <td>{sp.qm}</td>
                                            <td>{sp.grade}</td>
                                            <td>{sp.obs}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>
                        <div className='d-flex justify-content-center'>
                            <h6>Second semester</h6>
                        </div>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Title</th>
                                    <th>Credit</th>
                                    <th>CA/30</th>
                                    <th>NS/70</th>
                                    <th>AVG/100</th>
                                    <th>QM</th>
                                    <th>Grade</th>
                                    <th>Obs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    semester2.map(sp => (
                                        <tr>
                                            <td>{sp.code}</td>
                                            <td>{sp.title}</td>
                                            <td>{sp.credit}</td>
                                            <td>{sp.ca}</td>
                                            <td>{sp.ns}</td>
                                            <td>{sp.avg}</td>
                                            <td>{sp.qm}</td>
                                            <td>{sp.grade}</td>
                                            <td>{sp.obs}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </Table>
                    </div>
                    <hr />
                    <div class="row mt-1 mx-5 mb-2">
                        <div class="col-5 d-flex justify-content-center"></div>
                        <div class="col-2"></div>
                        <div class="col-5 d-flex justify-content-center">Date: <u>...............................</u></div>
                    </div>

                    <div class="row mt-1 mb-5 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">The head of department</div>
                        <div class="col-2"></div>
                        <div class="col-5 d-flex justify-content-center">The director of academic affairs</div>
                    </div>
                    <hr />
                    <div class="row mt-5 mx-5 mb-2">
                        <p className='d-flex justify-content-center'>This marks transcript is delivered in only one copy.
                            The holder can reproduce and obtain certified copies. Copy@right-2023 NFONAP-HIEPS & Fintel_RoyalSoft </p>
                    </div>
                </div>
                <div class="d-md-flex justify-content-md-end">
                    <button type='submit' className='btn btn-success' onClick={generatePdf}>
                        <FiPrinter className='card_icon' /> Download PDF
                    </button>
                </div>
            </div>
        </main >

    )
}

export default Trancript2