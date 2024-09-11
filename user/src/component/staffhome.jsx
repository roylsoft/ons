
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';
import { FaUserTie } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import { FaUserGraduate } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { BsGrid1X2Fill } from 'react-icons/bs'
import { MdOutlineClass, MdDashboardCustomize } from "react-icons/md";
import { ImCalculator } from "react-icons/im";


function Staffdashboad() {
    const navigate = useNavigate()
    const { mat } = useParams()

    const [adminTotal, setAdmindTotal] = useState()
    const [staffTotal, setStaffTotal] = useState()
    const [studentTotal, setStudentTotal] = useState()
    const [specialityTotal, setspecialityTotal] = useState()
    const [courseTotal, setCourseTotal] = useState()
    useEffect(() => {
        admincount();
        coursecount();
        specialitycount();
        studentcount();
        staffcount();
        mycourses()

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

    const [staff, setstaff] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/auth/staff/' + mat)
            .then(result => {
                // console.log(result.data)
                setstaff(result.data.Result[0])
            })
            .catch(err => console.log(err))
    }, [])

    const admincount = () => {
        axios.get('http://localhost:3001/auth/countadmin')
            .then(result => {
                if (result.data.Status) {
                    setAdmindTotal(result.data.Result[0].admin)
                }
            })
    }
    const studentcount = () => {
        axios.get('http://localhost:3001/auth/countstudent')
            .then(result => {
                if (result.data.Status) {
                    setStudentTotal(result.data.Result[0].student)
                }
            })
    }
    const specialitycount = () => {
        axios.get('http://localhost:3001/auth/countspeciality')
            .then(result => {
                if (result.data.Status) {
                    setspecialityTotal(result.data.Result[0].speciality)
                }
            })
    }
    const staffcount = () => {
        axios.get('http://localhost:3001/auth/countstaff')
            .then(result => {
                if (result.data.Status) {
                    setStaffTotal(result.data.Result[0].staff)
                }
            })
    }
    const coursecount = () => {
        axios.get('http://localhost:3001/auth/countcourse')
            .then(result => {
                if (result.data.Status) {
                    setCourseTotal(result.data.Result[0].course)
                }
            })
    }
    const [value, setValue] = useState([])
    const mycourses = () => {
        axios.get('http://localhost:3001/auth/courselist/' + mat)
            .then(result => {
                if (result.data.readingStatus) {
                    setValue(result.data.Result)
                    console.log(value);
                } else {
                    
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    const handlemark = () => {
        console.log(mat);
        navigate('/assignmark/' + mat)
    }

    axios.defaults.withCredentials = true
    const handlelogout = () => {
        axios.get('http://localhost:3001/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    navigate('/')
                }
            })

    }
    const [lecturer, setlecturer] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/auth/staff/' + mat)
            .then(result => {
                setlecturer(result.data.Result)
            })
            .catch(err => console.log(err))
    }, [])



    return (
        <div className='main-container'>
            <main >
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
                        <Link to='' className='secondary-button'>My informations</Link>

                        
                        <div className='mt-2 ms-1 '>
                            <Table striped bordered hover variant="dark" responsive>
                                <thead>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Matricule</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Grade</th>
                                        <th>Birth</th>
                                        <th>Place</th>
                                        <th>Sex</th>
                                        <th>ID card</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lecturer.map(st => (
                                            <tr>
                                                <td><img src={'https://server.nfonap.com/' + st.pic} alt="" className='profile_pic' /> </td>
                                                <td>{st.mat}</td>
                                                <td>{st.name}</td>
                                                <td>{st.email}</td>
                                                <td>{st.phone}</td>
                                                <td>{st.grade}</td>
                                                <td>{moment(st.birth).format("YYYY/MM/DD")}</td>
                                                <td>{st.place}</td>
                                                <td>{st.sex}</td>
                                                <td>{st.idcard}</td>
                                                <td>
                                                    <Link to={'/edstaffprofile/' + st.mat} className='btn btn-info bi-pencil-square btn-sm me-2'></Link>
                                                    {/* <Link className='btn btn-danger btn-sm bi-trash' onClick={()=>handelDelete(st.mat)}></Link> */}
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <h3>My courses</h3>
                        </div>

                        <div className='mt-2 ms-1 '>
                            <Table striped bordered hover variant="dark" responsive>
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Title</th>
                                        <th>Credit</th>
                                        <th>Specialisaty</th>
                                        <th>Level</th>
                                        <th>Semester</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        value.map(sp => (
                                            <tr>
                                                <td style={{color: 'white' }}>{sp.code}</td>
                                                <td>{sp.title}</td>
                                                <td>{sp.credit}</td>
                                                <td>{sp.spec}</td>
                                                <td>{sp.level}</td>
                                                <td>{sp.semester}</td>
                                                <td>{sp.type}</td>
                                            </tr>

                                        ))
                                    }
                                </tbody>
                            </Table>
                           
                        </div>
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default Staffdashboad