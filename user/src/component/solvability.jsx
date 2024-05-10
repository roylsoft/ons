import React, { useEffect, useRef, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useReactToPrint } from 'react-to-print'
import { FiPrinter } from "react-icons/fi";
import moment from 'moment';

function Solvability() {

    const pdf = useRef()


    const [students, setStudents] = useState([])
    const [values, setValues] = useState({
        mat: ""
    })
    const [value, setValue] = useState([]);
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const cdate = new Date();
    const date = moment(cdate).format('DD/MM/YYYY hh:mm:ss');
    const [num, setnum] = useState()
    
    const solvability = async () => {
        const url = 'https://admin-rust-gamma.vercel.app/student/solvability/data'
        axios.get(url, { params: { mat: values.mat } }
        )
            .then(result => {

                if (result.data.readingStatus) {
                    setValue(result.data.Result)
                    setStudents(result.data.Result[0])
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

    };

    const update = async (value) => {
        try {
            const valeur = value
            // Mettre à jour la valeur dans la base de données MySQL via une requête API
            await axios.put(`https://admin-rust-gamma.vercel.app/student/uprec`, { valeur });
        } catch (error) {
            console.error(error);
        }
    };

    const numerosol = () => {
        axios.get('https://admin-rust-gamma.vercel.app/student/number')
            .then(result => {
                if (result.data.readingStatus) {
                    update(result.data.Result[0].rec + 1)
                    let n = result.data.Result[0].rec + 1
                    const num = "N°0000" + n
                    setnum(num)

                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        numerosol()
        solvability();

    };


    useEffect(() => {
        axios.get('https://admin-rust-gamma.vercel.app/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {
                    setSpeciality(result.data.Result)

                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    // const handleCellChange = async (mat, field, value) => {
    //     try {
    //         const valeur = value
    //         const colone = field
    //         console.log(mat + " " + colone + " " + valeur);
    //         // Mettre à jour la valeur dans la base de données MySQL via une requête API
    //         await axios.put(`https://admin-rust-gamma.vercel.app/student/solvability/${mat}`, { colone, valeur, codesp: values.codesp });

    //         // Mettre à jour les données localement
    //         setValue(prevValue =>
    //             prevValue.map(item =>
    //                 item.mat === mat ? { ...item, [field]: value } : item
    //             )
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };


    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'receipt',
        onAfterPrint: () => alert('receipt saved successfully'),

    })

    let total = students.reg + students.inst1 + students.inst2 + students.inst3 + students.inst4 + students.inst5


    return (
        <main className='main-container'>
            <div className='px-2 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>School Fees</h3>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div class="row mt-1 mb-2">
                        <div class="col">
                            <p><h5>Student UID:</h5></p>
                        </div>

                        <div class="col">
                            <div class="col-6 mt-1 mb-2">
                                <input type="text" class="form-control"
                                    name="mat" onChange={(e) => setValues({ ...values, mat: e.target.value })}
                                    placeholder="Student UId" />
                            </div>
                        </div>
                        <div class="col"> <button type='submit' className='btn btn-success'>Display</button></div>

                    </div>
                </form>

                <hr />
                <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', marginTop: '8%' }}>
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            <p>REPUBLIC OF CAMEROON <br /><i>Peace-Work-Fatherland</i> <br />***** <br />MINISTRY OF HIGHER EDUCATION<br />*****<br />UNIVERSITY OF BAMENDA <br /> <i>Training - Pobity - Entrepreneurship</i> <br /> <br /> <b><h6>Receipt {num} </h6></b></p>
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <img src={'https://admin-rust-gamma.vercel.app/Screenshot_20240323-102722 (1).png'} alt="" className='logo' />
                        </div>
                        <div class="col-5 d-flex justify-content-center">
                            <p>NFONAP-HIEPS<br /><i>Training-development-expertise</i><br />*****<br />The Dean's Office <br />***** <br />P.O Box:2368 Messa-Yaounde <br />E-mail: <u>info@nfonap.education</u> <br />Registration: <u>www.nfonap.net</u><br />website: <u>www.nfonap.education</u> <br />Tel: <u>675550570 / 672545135</u></p>
                        </div>
                    </div>
                    <hr />
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            Full name: {students.name} <br />
                            Student UID : {students.mat} <br />
                            Speciality : {students.codesp}
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            Academic Year: {currentYear}/{nextYear}<br />
                        </div>
                        <div class="col-5 d-flex justify-content-center">
                            <div class="col-2 d-flex justify-content-center"> <strong>Class BMD/{students.codesp}{students.level}</strong>   </div>
                        </div>
                    </div>


                    <div className='mt-2 ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Student's UId</th>
                                    <th>Registration</th>
                                    <th>1st Instalment</th>
                                    <th>2nd Instalment</th>
                                    <th>3rd Instalment</th>
                                    <th>4th Instalment</th>
                                    <th>5th Instalment</th>
                                    <th>Total payed</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.map(st => (
                                        <tr key={st.mat}>
                                            <td>{st.mat}</td>
                                            <td>
                                            { st.reg}
                                            </td>
                                            <td>
                                             {st.inst1}
                                            </td>
                                            <td>
                                            { st.inst2}
                                            </td>
                                            <td>
                                            { st.inst3}
                                            </td>
                                            <td>
                                            { st.inst4}
                                            </td>
                                            <td>
                                             {st.inst5}
                                            </td>
                                            <td>{parseInt(st.reg) + parseInt(st.inst1) + parseInt(st.inst2) + parseInt(st.inst3) + parseInt(st.inst4) + parseInt(st.inst5)}</td>
                                        </tr>

                                    ))
                                }
                            </tbody>
                        </Table>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>University Tuition</th>
                                    <th>Graduation</th>
                                    <th>Supervision</th>
                                    <th>Practical</th>
                                    <th>Total Payed</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.map(st => (
                                        <tr key={st.mat}>
                                            <td>
                                             {st.univ}
                                            </td>
                                            <td>
                                           {  st.grad}
                                            </td>
                                            <td>
                                            { st.sup}
                                            </td>
                                            <td>
                                             {st.prac}
                                            </td>
                                            <td>{parseInt(st.univ) + parseInt(st.grad) + parseInt(st.sup) + parseInt(st.prac)}</td>

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
                        <div class="col-5 d-flex justify-content-center">Date: <u>{date}</u></div>
                    </div>

                    <div class="row mt-1 mb d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">The student: <br />Signature <br /> {students.name}</div>
                        <div class="col-2"></div>
                        <div class="col-5 d-flex justify-content-center">The accountant</div>
                    </div>
                    <hr />
                    <div class="row mt mx-5 mb">
                        <p className='d-flex justify-content-center'>This receipt NFONAP{num}HIEPS is delivered in only one copy.
                            Copy@right-2023 NFONAP-HIEPS {date}</p>
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

export default Solvability