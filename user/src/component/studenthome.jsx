
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';
import { FaUserTie } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaUserGraduate } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { BsGrid1X2Fill } from 'react-icons/bs'
import { MdOutlineClass, MdDashboardCustomize } from "react-icons/md";
import { useReactToPrint } from 'react-to-print'
import { FiPrinter } from "react-icons/fi";
import { MdDescription } from "react-icons/md";



function Studentdashboad() {

    const { mat } = useParams()

    const pdf = useRef()
    const [semester1, setsemester1] = useState([])
    const [semester2, setsemester2] = useState([])
    const [values, setValues] = useState({
        mat: mat
    })

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const [student, setStudent] = useState([])

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const [cycle, setcycle] = useState(null)
    const [num, setnum] = useState()
    const matri = values.mat

    const sutudentinf = () => {

        axios.get('http://localhost:3000/student/student/' + matri)
            .then(result => {
                let niv = result.data.Result[0].level
                setStudent(result.data.Result[0])
                if (niv == 1 || niv == 2) {
                    setcycle("HND")
                    console.log("cycle");
                } else if (niv == 4 || niv == 5) {
                    setcycle("Master")
                } else if (niv == 3) {
                    setcycle("Bachelor")
                } else {
                    setcycle("PhD candidate")
                }

            })
            .catch(err => console.log(err))
    }


    const numero = () => {
        axios.get('http://localhost:3000/student/number')
            .then(result => {
                if (result.data.readingStatus) {
                    update(result.data.Result[0].trans + 1)
                    let n=result.data.Result[0].trans + 1
                    const num = "N°19101606" + n
                    setnum(num)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    const update = async (value) => {
        try {
            const valeur = value
            // Mettre à jour la valeur dans la base de données MySQL via une requête API
            await axios.put(`http://localhost:3000/student/uptrans`, {valeur});
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault()
        numero()
        sutudentinf()
        update(num)
        axios.post('http://localhost:3000/auth/transcript1', values)
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

        axios.post('http://localhost:3000/auth/transcript2', values)
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


    const [adminTotal, setAdmindTotal] = useState()
    const [staffTotal, setStaffTotal] = useState()
    const [studentinf, setstudent] = useState([])
    const [studentTotal, setStudentTotal] = useState()
    const [specialityTotal, setspecialityTotal] = useState()
    const [courseTotal, setCourseTotal] = useState()
    useEffect(() => {
        admincount();
        coursecount();
        specialitycount();
        studentcount();
        staffcount();

    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/student/student/' + mat)
            .then(result => {
                setstudent(result.data.Result)
            })
            .catch(err => console.log(err))
    }, [])

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const admincount = () => {
        axios.get('http://localhost:3000/auth/countadmin')
            .then(result => {
                if (result.data.Status) {
                    setAdmindTotal(result.data.Result[0].admin)
                }
            })
    }
    const studentcount = () => {
        axios.get('http://localhost:3000/student/countstudent')
            .then(result => {
                if (result.data.Status) {
                    setStudentTotal(result.data.Result[0].student)
                }
            })
    }
    const specialitycount = () => {
        axios.get('http://localhost:3000/auth/countspeciality')
            .then(result => {
                if (result.data.Status) {
                    setspecialityTotal(result.data.Result[0].speciality)
                }
            })
    }
    const staffcount = () => {
        axios.get('http://localhost:3000/staff/countstaff')
            .then(result => {
                if (result.data.Status) {
                    setStaffTotal(result.data.Result[0].staff)
                }
            })
    }
    const coursecount = () => {
        axios.get('http://localhost:3000/auth/countcourse')
            .then(result => {
                if (result.data.Status) {
                    setCourseTotal(result.data.Result[0].course)
                }
            })
    }





    return (
        <main className='main-container'>
            <div className='main-title'>
                <h5>DASHBOARD</h5>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h5>Admins</h5>
                        <FaUserTie className='card_icon' />
                    </div><hr />
                    <h4>{adminTotal}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h5>Lecturers</h5>
                        <FaUserGraduate className='card_icon' />
                    </div><hr />
                    <h4>{staffTotal}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h5>Students</h5>
                        <PiStudentFill className='card_icon' />
                    </div><hr />
                    <h4>{studentTotal}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h5>Fields</h5>
                        <BsGrid1X2Fill className='card_icon' />
                    </div><hr />
                    <h4>{specialityTotal}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h5>Courses</h5>
                        <MdOutlineClass className='card_icon' />
                    </div><hr />
                    <h4>{courseTotal}</h4>
                </div>

            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>

            </div>
            <div className='px-2 mt-4 pt-3'>
                <div className='px-2 mt-4 pt-3'>
                    <Link to='' className='btn btn-success'>My informations</Link>
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
                                    studentinf.map(st => (
                                        <tr>
                                            <td> <img src={'http://localhost:3000/image/' + st.pic} alt="" className='profile_pic' /> </td>
                                            <td>{st.mat}</td>
                                            <td >{st.name}</td>
                                            <td>{st.email}</td>
                                            <td>{st.phone}</td>

                                            <td>{moment(st.birth).format("YYYY/MM/DD")}</td>
                                            <td>{st.place}</td>
                                            <td >{st.sex}</td>

                                            <td>
                                                <Link to={'/editstudentprofile/' + st.mat} className='btn btn-info btn-sm me-2 bi-pencil-square'></Link>
                                                <Link className='btn btn-danger btn-sm bi-trash' onClick={() => handelDelete(st.mat)}></Link>
                                            </td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </Table>

                    </div>

                </div>
                <div className='px-2 mt-3'>
                    <div class="row mt-1 mb-2">
                       
                            <div class="row mt-1 mb-2">
                            
                                <div class="col-3"> <button onClick={handleSubmit} className='btn btn-success'><MdDescription className='icon' />Generate my transcript</button></div>

                            </div>
                     
                    </div>
                    <hr />
                    <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', fontSynthesisWeight: 'auto', marginTop: '8%' }} className='pdf'>
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
                        <div class="row mt-1 mb-2 d-flex justify-content-center">
                            <div class="col-5 d-flex justify-content-center">
                                Full name: {student.name} <br />
                                Date of birth: {moment(student.birth).format("DD/MM/YYYY")}<br />
                                Place of birth: {student.place} <br />
                                Gender: {student.sex}<br />
                                Student UID : {mat}
                            </div>
                            <div class="col-2 d-flex justify-content-center">
                                <strong><i>ANNUAL TRANSCRIPT</i> <br /> {num}/CM/UBA/NHIEPS/{student.dep}/{student.spec} </strong>
                            </div>
                            <div class="col-5 d-flex justify-content-center">
                                <img src={`http://localhost:3000/image/${student.pic}`}
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
            </div>
        </main>

    )
}

export default Studentdashboad