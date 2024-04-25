import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaUserGraduate } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { ImCalculator } from "react-icons/im";
import { MdDescription } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { MdOutlineClass, MdDashboardCustomize } from "react-icons/md";
import { BsGrid1X2Fill } from 'react-icons/bs'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'
import { FiPrinter } from 'react-icons/fi';

function Studentsidebar({ openSidebarToggle, setOpenSidebarToggle, mat}) {

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
                    <img src={'http://localhost:3000/image/Screenshot_20240323-102722 (1).png'} alt="" className='logo' />
                    NHIEPS
                </div>
                <span className='icon close_icon' onClick={() => setOpenSidebarToggle(!openSidebarToggle)}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <Link to={`/studenthome/${mat}`} onClick={handleLinkClick}>
                        <MdDashboardCustomize className='icon' /> Dashboard
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/admin1" onClick={handleLinkClick}>
                        <PiStudentFill className='icon' /> Admins
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/studentlist2" onClick={handleLinkClick}>
                        <PiStudentFill className='icon' /> Students
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/staff1" onClick={handleLinkClick}>
                        <FaUserGraduate className='icon' /> Lecturers
                    </Link>
                </li>

                <li className='sidebar-list-item'>
                    <Link to="/specialities1" onClick={handleLinkClick}>
                        <BsGrid1X2Fill className='icon' /> Specialities
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/courselist2" onClick={handleLinkClick}>
                        <MdOutlineClass className='icon' /> Courses
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/department1" onClick={handleLinkClick}>
                        <FcDepartment className='icon' /> Departments
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/timetable2" onClick={handleLinkClick}>
                        <MdOutlineClass className='icon' /> Time table
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/mark1" onClick={handleLinkClick}>
                        <ImCalculator className='icon' /> Marks
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <button className='btn btn-warning' onClick={handlelogout}>
                        <Link to="">
                            <RiLogoutCircleLine className='icon' /> Logout
                        </Link>
                    </button>
                </li>
                

            </ul>
            <div className='col p-0 m-0'>
                <Outlet></Outlet>
            </div>
        </aside>

    )
}

export default Studentsidebar