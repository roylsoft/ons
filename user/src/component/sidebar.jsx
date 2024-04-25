import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaUserGraduate } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { MdDescription } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { ImCalculator } from "react-icons/im";
import { FaCalendarCheck } from "react-icons/fa6";
import { RxLapTimer } from "react-icons/rx";
import { FcDepartment } from "react-icons/fc";
import { MdOutlineClass, MdDashboardCustomize } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa";
import { BsGrid1X2Fill } from 'react-icons/bs'
import { FaSackDollar } from "react-icons/fa6";
import { FaKey } from "react-icons/fa";
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import { FiPrinter } from 'react-icons/fi';


function Sidebar({ openSidebarToggle, setOpenSidebarToggle, mat }) {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    const handlelogout = () => {
        axios.get('http://localhost:3000/auth/logout')
            .then(result => {
                if (result.data.Status) {
                    navigate('/')
                    window.location.reload()
                }
            })
    }
    const handleLinkClick = () => {
        if (openSidebarToggle) {
            setOpenSidebarToggle(false);
        }
    };
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <img src={'http://localhost:3000/image/Screenshot_20240323-102722 (1).png'}
                        alt="" className='logo' />
                    NHIEPS
                </div>
                <span className='icon close_icon' onClick={() => setOpenSidebarToggle(!openSidebarToggle)}>
                    X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to={`/home/${mat}`} onClick={handleLinkClick}>
                        <MdDashboardCustomize className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/studentlist" onClick={handleLinkClick}>
                        <PiStudentFill className='icon' /> Students
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/staff" onClick={handleLinkClick}>
                        <FaUserGraduate className='icon' /> Lecturers
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/department" onClick={handleLinkClick}>
                        <FcDepartment className='icon' /> Departments
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/specialities" onClick={handleLinkClick}>
                        <BsGrid1X2Fill className='icon' /> Specialities
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to="/courselist" onClick={handleLinkClick}>
                        <MdOutlineClass className='icon' /> Courses
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/timetable" onClick={handleLinkClick}>
                        <RxLapTimer className='icon' /> Time table
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/mark" onClick={handleLinkClick}>
                        <ImCalculator className='icon' /> Marks
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/attendance" onClick={handleLinkClick}>
                        <FaCalendarCheck className='icon' />Attendance
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/solvability" onClick={handleLinkClick}>
                        <FaBitcoin className='icon' />School fees
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/payement" onClick={handleLinkClick}>
                        <FaSackDollar className='icon' />Salaries
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/transcript" onClick={handleLinkClick}>
                        <MdDescription className='icon' />Transcripts
                    </Link>
                </li>
                {/* <li className='sidebar-list-item'>
                    <Link to={`/profile/${mat}`} onClick={handleLinkClick}>
                        <CgProfile className='icon' /> My Profile
                    </Link>
                </li> */}
                <li className='sidebar-list-item'>
                    <Link to={"/key"} onClick={handleLinkClick}>
                        <FaKey className='icon' /> Keys
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <button className='btn btn-warning' onClick={handlelogout}>
                        <Link to="">
                            <RiLogoutCircleLine className='icon' /> Logout
                        </Link>
                    </button>
                </li>
                <hr />
                <li className='sidebar-list-item'>
                    <Link to="" onClick={handleLinkClick}>
                        {/* <FaKey className='icon' />  */}
                        Print doccuments
                    </Link>
                </li>
                <hr />
                <div>
                    <li className='sidebar-list-item'>
                            <Link to={'/studentprint'} onClick={handleLinkClick}>
                                <FiPrinter className='icon' /> Student's list
                            </Link>
                    </li>
                    <li className='sidebar-list-item'>
                            <Link to={"/timetableprint"}>
                                <FiPrinter className='icon' /> Time table
                            </Link>
                    </li>
                    <li className='sidebar-list-item'>
                            <Link to={"/salaryprint"}>
                                <FiPrinter className='icon' /> Salaries board
                            </Link>
                    </li>
                    <li className='sidebar-list-item'>
                            <Link to={"/staffprint"}>
                                <FiPrinter className='icon' /> Lecturer's list
                            </Link>
                    </li>
                    <li className='sidebar-list-item'>
                            <Link to={"/markprint"}>
                                <FiPrinter className='icon' /> Exams VP
                            </Link>
                    </li>
                    <li className='sidebar-list-item'>
                            <Link to="/feesboard">
                                <FiPrinter className='icon' /> Solvability's board
                            </Link>
                    </li>
                </div>

            </ul>
            <div className='col p-0 m-0'>
                <Outlet></Outlet>
            </div>
        </aside>

    )
}

export default Sidebar