import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Stafflogin from './component/logintostaff.jsx';
import Adminlogin from './component/adminlogin.jsx';
import Login from './component/login.jsx'
import Commun from './component/commun.jsx'
import Verifkey from './component/verifkey.jsx';

import Addstudent from './component/addstudent.jsx'
import Studentlist from './component/studentlist.jsx'
import Studentprint from './component/studentprint.jsx'
import Home from './component/home.jsx';
import Addcourse from './component/addcourse.jsx';
import Addspeciality from './component/addspeciality.jsx';
import Specialities from './component/specialities.jsx';
import Courselist from './component/courselist.jsx';
import Adddepartment from './component/adddepartement.jsx';
import Department from './component/department.jsx';
import Editstudent from './component/editstudent.jsx';
import Staff from './component/staff.jsx';
import Staffprint from './component/staffprint.jsx';
import Addstaff from './component/addstaff.jsx';
import Editstaff from './component/editstaff.jsx';
import Addadmin from './component/addadmin.jsx';
import Editadmin from './component/editadmin.jsx';
import Profile from './component/profile.jsx';
import Sec from './component/Sec.jsx';
import Editcourse from './component/editcourse.jsx';
import Editspec from './component/editspec.jsx';
import Editdep from './component/editdep.jsx';
import Mark from './component/mark.jsx';
import Header from './component/Header.jsx'
import Sidebar from './component/sidebar.jsx'
import Timetable from './component/timetable.jsx'
import Attendance from './component/attendance.jsx';
import Addattendance from './component/addattendance.jsx';
import Payement from './component/payement.jsx'
import Transcript from './component/transcript.jsx'


import Lecturer from './component/lecturer.jsx';
import Staffhome from './component/staffhome.jsx';
import Studentlist1 from './component/studentlist1.jsx';
import Staff1 from './component/staff1.jsx';
import Admin1 from './component/admin1.jsx';
import Department1 from './component/department1.jsx';
import Courselist1 from './component/courselist1.jsx';
import Mark1 from './component/mark1.jsx';
import Staffsidebar from './component/staffsidebar.jsx';
import Specialities1 from './component/specialities1.jsx';
import Timetable1 from './component/timetable1.jsx'
import Transcript1 from './component/transcript1.jsx'


import Studenthome from './component/studenthome.jsx';
import Studentsidebar from './component/studentsidebar.jsx'
import Specialities2 from './component/Specialities2.jsx';
import Studentprint2 from './component/studentlist2.jsx';
import Admin2 from './component/admin2.jsx';
import Staff2 from './component/staff2.jsx';
import Courselist2 from './component/courselist2.jsx';
import Department2 from './component/department2.jsx';
import Student2 from './component/student2.jsx';
import Mark2 from './component/Marks2.jsx';
import Timetable2 from './component/timetable2.jsx'
import Transcript2 from './component/transcript2.jsx'
import Studentreg from './component/studentreg.jsx';
import Key from './component/key.jsx';
import Salaryprint from './component/salaryprint.jsx';
import Timetableprint from './component/timetableprint.jsx';
import Markprint from './component/marksprint.jsx';
import Solvability from './component/solvability.jsx';
import Feesboard from './component/feesboard.jsx';
import Editstaffprofile from './component/edstaffprofile.jsx';
import Assignmark from './component/assignexammarks.jsx';
import Editstudentprofile from './component/editstudentprofile.jsx';
import Solvability1 from './component/frombanker.jsx';
import Loginbank from './component/loginbank.jsx';
import Addbanker from './component/addbanker.jsx';
import Editbanker from './component/editbanker.jsx';
import Solvability2 from './component/mypayement.jsx';
import Home1 from './component/Home1.jsx';
import Adddelegate from './component/adddelegate.jsx';
import Editdelegate from './component/editdelegate.jsx';




function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const [userRole, setUserRole] = useState(null)
  useEffect(() => {
    // Récupérer le rôle de l'utilisateur à partir du localStorage ou du sessionStorage
    const storedUserRole = localStorage.getItem('userRole')
    setUserRole(storedUserRole)
  }, [])
  let way = location.pathname
  let words = way.split("/")
  let mat = words.pop();


  // Check if the current location matches the routes in this file
  const shouldRenderHeaderAndSidebar1 =
    location.pathname.startsWith('/studentlist') ||
    location.pathname.startsWith('/studentprint') ||
    location.pathname.startsWith('/salaryprint') ||
    location.pathname.startsWith('/timetableprint') ||
    location.pathname.startsWith('/editcourse') ||
    location.pathname.startsWith('/updatecourse') ||
    location.pathname.startsWith('/editspec') ||
    location.pathname.startsWith('/staff') ||
    location.pathname.startsWith('/staffprint') ||
    location.pathname.startsWith('/home') ||
    location.pathname.startsWith('/addadmin') ||
    location.pathname.startsWith('/addbanker') ||
    location.pathname.startsWith('/editbanker') ||
    location.pathname.startsWith('/editadmin') ||
    location.pathname.startsWith('/addstudent') ||
    location.pathname.startsWith('/editstudent') ||
    location.pathname.startsWith('/specialities') ||
    location.pathname.startsWith('/addspeciality') ||
    location.pathname.startsWith('/adddelegate') ||
    location.pathname.startsWith('/addcourse') ||
    location.pathname.startsWith('/courselist') ||
    location.pathname.startsWith('/adddepartment') ||
    location.pathname.startsWith('/department') ||
    location.pathname.startsWith('/editdep') ||
    location.pathname.startsWith('/profile') ||
    location.pathname.startsWith('/addstaff') ||
    location.pathname.startsWith('/mark') ||
    location.pathname.startsWith('/markprint') ||
    location.pathname.startsWith('/timetable') ||
    location.pathname.startsWith('/payement') ||
    location.pathname.startsWith('/solvability') ||
    location.pathname.startsWith('/frombanker') ||
    location.pathname.startsWith('/feesboard') ||
    location.pathname.startsWith('/transcript') ||
    location.pathname.startsWith('/attendance') ||
    location.pathname.startsWith('/key') ||
    location.pathname.startsWith('/editdelegate') ||
    location.pathname.startsWith('/editstaff');

  // Check if the current location matches the routes in this file
  const shouldRenderHeaderAndSidebar2 =
    location.pathname.startsWith('/lecturer') ||
    location.pathname.startsWith('/staffhome') ||
    location.pathname.startsWith('/studentlist1') ||
    location.pathname.startsWith('/admin1') ||
    location.pathname.startsWith('/staff1') ||
    location.pathname.startsWith('/mark1') ||
    location.pathname.startsWith('/specialities1') ||
    location.pathname.startsWith('/department1') ||
    location.pathname.startsWith('/assignexammarks') ||
    location.pathname.startsWith('/timetable1') ||
    location.pathname.startsWith('/transcript1') ||
    location.pathname.startsWith('/edstaffprofile') ||
    location.pathname.startsWith('/courselist1');

  // Check if the current location matches the routes in this file
  const shouldRenderHeaderAndSidebar3 =
    location.pathname.startsWith('/student2') ||
    location.pathname.startsWith('/studenthome') ||
    location.pathname.startsWith('/studentlist2') ||
    location.pathname.startsWith('/admin2') ||
    location.pathname.startsWith('/staff2') ||
    location.pathname.startsWith('/Marks2') ||
    location.pathname.startsWith('/courselist2') ||
    location.pathname.startsWith('/specialities2') ||
    location.pathname.startsWith('/timetable2') ||
    location.pathname.startsWith('/transcript2') ||
    location.pathname.startsWith('/mypayement') ||
    location.pathname.startsWith('/editstudentprofile') ||
    location.pathname.startsWith('/department2');

  // Conditionally apply a CSS class to the grid-container element
  // Determine if the current route is the Starter page

  const isStarterPage = location.pathname === '/';
  const isAdminloginPage = location.pathname === '/adminlogin.jsx';
  const isLoginPage = location.pathname === '/login.jsx';
  const isLoginbanker = location.pathname === '/loginbank.jsx';
  const isLoginstaffPage = location.pathname === '/logintostaff.jsx';
  const isCommun = location.pathname === '/commun.jsx';
  const isAddattendance = location.pathname === '/addattendance.jsx';
  const isStudent = location.pathname === '/studentreg.jsx';
  const isVerifkey = location.pathname === '/verifkey.jsx';

  const gridContainerClassName = isStarterPage || isAdminloginPage || isLoginPage ||
    isLoginstaffPage || isCommun || isAddattendance || isVerifkey || isStudent || isLoginbanker
    ? 'grid-container-starter' : 'grid-container';


  return (
    <div>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home1 />} />
          </Routes>
        </Router>
      </div>

      <div className={gridContainerClassName}>
        <Router>
          {userRole === 'admin' && shouldRenderHeaderAndSidebar1 && <Header OpenSidebar={OpenSidebar} />}
          {userRole === 'admin' && shouldRenderHeaderAndSidebar1 &&
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} mat={mat} />}

          {userRole === 'staff' && shouldRenderHeaderAndSidebar2 && <Header OpenSidebar={OpenSidebar} />}
          {userRole === 'staff' && shouldRenderHeaderAndSidebar2 &&
            <Staffsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} mat={mat} />}

          {userRole === 'student' && shouldRenderHeaderAndSidebar3 && <Header OpenSidebar={OpenSidebar} />}
          {userRole === 'student' && shouldRenderHeaderAndSidebar3 &&
            <Studentsidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} mat={mat} />}

          <Routes>

            <Route path="/login.jsx" element={<Login />} />
            <Route path="/logintostaff.jsx" element={<Stafflogin />} />
            <Route path="/loginbank.jsx" element={<Loginbank />} />
            <Route path="/adminlogin.jsx" element={<Adminlogin />} />
            <Route path="/addattendance/:mat" element={<Addattendance />} />
            <Route path="/commun.jsx" element={<Commun />} />
            <Route path="/studentreg.jsx" element={<Studentreg />} />
            <Route path="/verifkey.jsx" element={<Verifkey />} />

            <Route path="/frombanker/:mat" element={<Solvability1 />} />
            <Route path="/studentlist/:mat" element={<Studentlist />} />
            <Route path="/studentprint/:mat" element={<Studentprint />} />
            <Route path="/timetableprint/:mat" element={<Timetableprint />} />
            <Route path="/editcourse/:mat/:suite" element={<Editcourse />} />
            <Route path="/editspec/:mat/:suite" element={<Editspec />} />
            <Route path="/editstudent/:mat/:suite" element={<Editstudent />} />
            <Route path="/editdep/:mat/:suite" element={<Editdep />} />
            <Route path="/editstaff/:mat/:suite" element={<Editstaff />} />
            <Route path="/editdelegate/:mat/:suite" element={<Editdelegate />} />
            <Route path="/editbanker/:mat/:suite" element={<Editbanker />} />
            <Route path="/editadmin/:mat/:suite" element={<Editadmin />} />
            <Route path="/studentlist/:mat" element={<Studentlist />} />
            <Route path="/staff/:mat" element={<Staff />} />
            <Route path="/staffprint/:mat" element={<Staffprint />} />
            <Route path="home/:mat" element={<Home />} />
            <Route path="/addadmin/:mat" element={<Addadmin />} />
            <Route path="/addstudent/:mat" element={<Addstudent />} />
            <Route path="/adddelegate/:mat" element={<Adddelegate />} />
            <Route path="/specialities/:mat" element={<Specialities />} />
            <Route path="/addspeciality/:mat" element={<Addspeciality />} />
            <Route path="/addcourse/:mat" element={<Addcourse />} />
            <Route path="/addbanker/:mat" element={<Addbanker />} />
            <Route path="/editbanker/:mat" element={<Editbanker />} />
            <Route path="/courselist/:mat" element={<Courselist />} />
            <Route path="/transcript/:mat" element={<Transcript />} />
            <Route path="/adddepartment/:mat" element={<Adddepartment />} />
            <Route path="/department/:mat" element={<Department />} />
            <Route path="/profile/:mat" element={<Profile />} />
            <Route path="/addstaff/:mat" element={<Addstaff />} />
            <Route path="/mark/:mat" element={<Mark />} />
            <Route path="/markprint/:mat" element={<Markprint />} />
            <Route path="/timetable/:mat" element={<Timetable />} />
            <Route path="/attendance/:mat" element={<Attendance />} />
            <Route path="/payement/:mat" element={<Payement />} />
            <Route path="/solvability/:mat" element={<Solvability />} />
            <Route path="/feesboard/:mat" element={<Feesboard />} />
            <Route path="/salaryprint/:mat" element={<Salaryprint />} />
            <Route path="/key/:mat" element={<Key />} />



            <Route path="/lecturer/:mat" element={<Lecturer />} />
            <Route path="/staffhome/:mat" element={<Staffhome />} />
            <Route path="/studentlist1/:mat" element={<Studentlist1 />} />
            <Route path="/timetable1/:mat" element={<Timetable1 />} />
            <Route path="/admin1/:mat" element={<Admin1 />} />
            <Route path="/staff1/:mat" element={<Staff1 />} />
            <Route path="/mark1/:mat" element={<Mark1 />} />
            <Route path="/specialities1/:mat" element={<Specialities1 />} />
            <Route path="/department1/:mat" element={<Department1 />} />
            <Route path="/transcript1/:mat" element={<Transcript1 />} />
            <Route path="/assignexammarks/:inf" element={<Assignmark />} />
            <Route path="/courselist1/:mat" element={<Courselist1 />} />
            <Route path="/edstaffprofile/:mat" element={<Editstaffprofile />} />


            <Route path="/student2/:mat" element={<Student2 />} />
            <Route path="/studenthome/:mat" element={<Studenthome />} />
            <Route path="/studentlist2/:mat" element={<Studentprint2 />} />
            <Route path="/admin2/:mat" element={<Admin2 />} />
            <Route path="/staff2/:mat" element={<Staff2 />} />
            <Route path="/Marks2/:mat" element={<Mark2 />} />
            <Route path="/courselist2/:mat" element={<Courselist2 />} />
            <Route path="/specialities2/:mat" element={<Specialities2 />} />
            <Route path="/department2/:mat" element={<Department2 />} />
            <Route path="/transcript2/:mat" element={<Transcript2 />} />
            <Route path="/editstudentprofile/:mat" element={<Editstudentprofile />} />
            <Route path="/timetable2/:mat" element={<Timetable2 />} />
            <Route path="/mypayement/:mat" element={<Solvability2 />} />
          </Routes>
        </Router>
      </div>

    </div>
  )
}

export default App