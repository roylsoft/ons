import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { FaUserGraduate } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line }
  from 'recharts';

function Starter() {
  const navigate = useNavigate()

  axios.defaults.withCredentials = true
  useEffect(() => {

    axios.get('http://localhost:3000/verify')
      .then(result => {

        if (result.data.Status) {
          window.location.reload()
          if (result.data.role === "admin") {
            navigate('/home')
          } else if (result.data.role === "staff") {
            navigate('/staff/' + result.data.mat)
          } else if (result.data.role === "student") {
            navigate('/student/' + result.data.mat)
          }
        }
      }).catch(err => console.log(err))
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
  return (
    <div>
      <header className='header1'>
        <div className='header-left'>
          <img src={'http://localhost:3000/image/University_of_Bamenda_logo.png'} alt="" className='logo' />
        </div>
        <div class='d-flex justify-content-center align-items-center' >
          <p align="center"> <strong>UNIVERSITY OF BAMENDA<br /> <i>Knowledge Probity Entrepreneurship</i> <br />*****<br />NFONAP HIEPS <br />
            ***** <br /> <i>Training-development-expertise</i></strong> </p>
        </div>
        <div className='header-right'>
          <img src={'http://localhost:3000/image/Screenshot_20240323-102722 (1).png'} alt="" className='logo' />
        </div>

      </header>

      <div>
        <div className='justify-content-center mt-2 align-items-center blinks'>
          <p align="center">Welcome to your house</p>
          <div className='justify-content-center align-items-center'>
            <p align="center">NFONAP</p>
            <img src={'http://localhost:3000/image/welcome.jpg'} alt="" className='logo1' />
          </div>
        </div>
        <marquee behavior="scroll" direction="left">
          <div className='marqee'>Because Technology is at the center of our development,
            While we always keep a very attentive ear to your needs, as a pillar of Technology,
            if not, hard workers to immerse you in high technologies,
            we have built this awesome application by your Grace and for You.
          </div>
        </marquee>

        <div className='justify-content-center align-items-center loginPage'>

          <div className='p-3 mx-2 mt-3 shadow-sm border welcome'>
            <div className='justify-content-center align-items-center'>
              <img src={'http://localhost:3000/image/log.jpg'} alt="" className='logo' />
            </div>
            <h6 className='text-center'>Do you have and Account? Yes! Okey! Login as:</h6> <br />
            <div className='p-1 d-flex justify-content-around mt-3 log'>
              <div className='px-2 pt-2 pb-3 mx-2 shadow-sm w-5 log1'>
                <div className='text-center'>
                  <PiStudentFill className='icon' />
                  <h6>Students</h6>
                </div> <hr />
                <div className='d-flex justify-content-center'>
                  <h5> <button type='button' className='btn btn-primary '
                    onClick={() => { navigate('/login') }}>Student</button>
                  </h5>
                </div>
              </div>

              <div className='px-2 pt-2 pb-3 mt-5 shadow-sm w-5 log2'>
                <div className='text-center'>
                  <FaUserTie className='icon' />
                  <h6>Admins</h6>
                </div> <hr />
                <div className='d-flex justify-content-center'>
                  <h5> <button type='button' className='btn btn-success'
                    onClick={() => { navigate('/adminlogin') }}>Host</button></h5>

                </div>

              </div>
              <div className='px-2 pt-2 pb-3 mx-3 shadow-sm w-5 log3'>
                <div className='text-center'>
                  <FaUserGraduate className='icon' />
                  <h6>Staff</h6>
                </div> <hr />
                <div className='d-flex justify-content-center'>
                  <h5>  <button type='button' className='btn btn-info '
                    onClick={() => { navigate('/logintostaff') }}>Lecturer</button> </h5>

                </div>
              </div>

            </div>
            <div className='d-flex justify-content-center mt-1 mb-2'>
              <div className='px-2 pt-2 pb-2 mx-3 shadow-sm w-5 log2'>
                <div className='text-center'>
                  <FaUserGraduate className='icon' />
                </div> <hr />
                <div className='d-flex justify-content-center'>
                  <h5>  <button type='button' className='btn btn-info '
                    onClick={() => { navigate('/commun') }}>Delegate</button> </h5>
                </div>
              </div>
            </div>
          </div>

          <div className='p-2 mx-2 mt-3 shadow-sm border welcome'>
            <div className='justify-content-center align-items-center'>
              <img src={'http://localhost:3000/image/reg.jpg'} alt="" className='logo' />
            </div>
            <h6 className='text-center'>No Account? Don't Worry! Just take your registration!</h6> <br />
            <div className='p-1 d-flex justify-content-around mt-3 log'>
              <div className='px-2 pt-2 pb-3 mx-2 shadow-sm w-5 log1'>
                <div className='text-center'>
                  <PiStudentFill className='icon' />
                  <h6>Students</h6>
                </div> <hr />
                <div className='d-flex justify-content-center'>
                  <h5> <button type='button' className='btn btn-primary '
                    onClick={() => { navigate('/studentreg') }}>Student</button>
                  </h5>
                </div>
              </div>
              <div className='px-2 pt-2 pb-3 mx-3 shadow-sm w-5 log3'>
                <div className='text-center'>
                  <FaUserGraduate className='icon' />
                  <h6>Staff</h6>
                </div> <hr />
                <div className='d-flex justify-content-center'>
                  <h5>  <button type='button' className='btn btn-info '
                    onClick={() => { navigate('/verifkey') }}>Lecturer</button> </h5>

                </div>
              </div>

            </div>

          </div>
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
      <div className='d-flex mt-4 justify-content-center align-items-center partner'>
        <p>
          <strong>
            Our Official Partners
          </strong>
        </p>
      </div>
      <marquee behavior="scroll" direction="left">
        <div class="row mt-4 mb-4">
          <div class="col-3 d-flex justify-content-center">
            <img src={'http://localhost:3000/image/1711200446992.jpg'} alt="" className='logo' />
          </div>
          <div class="col-3 d-flex justify-content-center">
            <img src={'http://localhost:3000/image/SGN_08_31_2023_1693476007417.png'} alt="" className='logo' />
          </div>
          <div class="col-3 d-flex justify-content-center">
            <img src={'http://localhost:3000/image/SGN_08_31_2023_1693476007417.png'} alt="" className='logo' />
          </div>
          <div class="col-3 d-flex justify-content-center">
            <img src={'http://localhost:3000/image/1664292131120.jpeg'} alt="" className='logo' />
          </div>
        </div>
      </marquee>
      <strong><hr /></strong>

      <footer className='footer'>

        <div class='footer-left'>
          <p align="center" > <strong>NFONAP-HIEPS<br />*****<br />Apply for Adminssion<br />*****<br />
            Downloard your transcript <br />***** <br />Contact our Secretariat:<br />Tel and WhatsApp: <br />
            675 324 045 / 677 442 717 / 672 868 836<br />***** <br />The Dean's Office
            <br />Tel and WhatsApp: <br /> <u>675550570 / 672545135</u><br />***** <br />P.O Box:2368 Messa-Yaounde <br />
            E-mail: <u>info@nfonap.education</u> <br /></strong> </p>
        </div>
        <div class='footer-right'>
          <p align="center"> <strong> Our Eperts<br />*****<br />ICT Engineer & Developper:
            <br />RoyalSoft <br />
            Tel: <u>(+237) 678474295 / 621026860</u><br />
            WhatsApp: <br /> <u>(+237) 678474295 / 694769482 / 670509191</u><br />
            E-mail: <u>roylsoftindustry@gmail.com</u> <br />*****<br />
            Health & Biomedical: <br /> Tel and WhatsApp: <u>680984899</u>
            <br />Digital Marketer:
            <br /> Tel and WhatsApp: <u>676701030</u></strong></p>
        </div>
      </footer>
      <div class="row mt-5 mx-5 mb-2 copy">
        <p className='d-flex justify-content-center '><strong>Copy@right-2023 <span class="copyrighter">NFONAP-HIEPS</span>
          & <span class="copyrighter">FINTEL_RoyalSoft</span>. Powered by Ets.<span class="copyrighter">RoyalSoft Insdustry</span>
        </strong> </p>
      </div>
    </div>
  )
}

export default Starter