import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';
import { FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';



function Staffprint() {
    const [value, setValue] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/staff/staff')
            .then(result => {
                if (result.data.readingStatus) {
                    setValue(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])
    const pdf = useRef()

    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'staff\'s list',
        onAfterPrint: () => alert('staff\'s list saved successfully'),

    })
    return (
        <main className='main-container'>
            <div className='px-2 mt-3'>
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
                    <div className='d-flex justify-content-center'>
                        <h3>Our Lecturers</h3>
                    </div>
                    <hr />
                    <div className='mt-2 ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Sex</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.map(st => (
                                        <tr>
                                            <td>{st.name}</td>
                                            <td>{st.email}</td>
                                            <td>{st.phone}</td>
                                            <td>{st.sex}</td>
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

export default Staffprint