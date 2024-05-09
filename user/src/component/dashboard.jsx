import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios'

function Dashboard() {
    const navigate =useNavigate()
    axios.defaults.withCredentials = true
    const handlelogout =()=>{
       axios.get('https://server-six-bice.vercel.app/auth/logout')
       .then(result=>{
        if(result.data.Status){
            navigate('/')
        }
       })

    }
    

  return (
    <div className='container-fluid'>
        <div className='row flex-nowrap'>
            <div className='col p-0 m-0'>
                <Outlet></Outlet>
            </div>
        </div>
    </div>
  );
};

export default Dashboard