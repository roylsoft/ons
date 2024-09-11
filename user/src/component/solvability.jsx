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
        mat: "",
        cle: "",
        year: ""
    })
    const [value, setValue] = useState([]);
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const cdate = new Date();
    const date = moment(cdate).format('YYYY-MM-DD hh:mm:ss');
    const [num, setnum] = useState()

    const solvability = async () => {
        const k = "1910sourceeva1606"
        const k1 = "1910sourceVally1606"
        if (values.cle === k || values.cle === k1) {
            const url = 'http://localhost:3001/auth/solvability/data'
            axios.get(url, { params: { mat: values.mat, year: values.year } }
            )
                .then(result => {

                    if (result.data.readingStatus) {
                        setValue(result.data.Result)
                        setStudents(result.data.Result[0])
                    } else {
                        alert(result.data.Error)
                    }
                }).catch(err => console.log(err))
        } else {
            alert("Sorry you are not allowed to access this session!")
        }

    };

    const update = async (value) => {
        try {
            const valeur = value
            // Mettre à jour la valeur dans la base de données MySQL via une requête API
            await axios.put(`http://localhost:3001/auth/uprec`, { valeur });
        } catch (error) {
            console.error(error);
        }
    };

    const numerosol = () => {
        axios.get('http://localhost:3001/auth/number')
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

    const [speciality, setSpeciality] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {
                    setSpeciality(result.data.Result)

                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

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
                    <div class="mt-1 mb-2 row">

                        <div class="form-group">

                            <input type="text" class="form-control mb-3"
                                name="mat" onChange={(e) => setValues({ ...values, mat: e.target.value })}
                                placeholder="Student UId" />
                            <label htmlFor="year"><strong>Academic year<span className='start'>*</span></strong></label>
                            <select type="select" onChange={(e) => setValues({ ...values, year: e.target.value })}
                                name='year' autoComplete='off' placeholder='academic year' className='form-control rounded-2'>
                                <option value="">-- Select the academic year --</option>
                                <option value="2024_2025">2024/2025</option>
                                <option value="2025_2026">2025/2026</option>
                                <option value="2026_2027">2026/2027</option>
                                <option value="2027_2028">2027/2028</option>
                                <option value="2028_2029">2028/2029</option>
                            </select>
                            <label htmlFor="cle"><strong>Admin key:</strong></label>
                            <input type="text" onChange={(e) => setValues({ ...values, cle: e.target.value })}
                                name='cle' autoComplete='off' placeholder='Enter key'
                                className='form-control rounded-0' />

                            <button type='submit' className='secondary-button'>Display</button>


                        </div>


                    </div>
                </form>

                <hr />
                <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', marginTop: '8%' }}>
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            <p>REPUBLIC OF CAMEROON <br /><i>Peace-Work-Fatherland</i> <br />***** <br />MINISTRY OF HIGHER EDUCATION<br />*****<br />UNIVERSITY OF BAMENDA <br /> <i>Training - Pobity - Entrepreneurship</i> <br /> <br /> <b><h6>Receipt {num} </h6></b></p>
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            <img src={'../../public/nfonap.png.png'} alt="" className='logo' />
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
                            Branch: {students.branch} <br />
                            Speciality : {students.codesp}
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            Academic Year: {value.year}<br />
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
                                                {st.reg}
                                            </td>
                                            <td>
                                                {st.inst1}
                                            </td>
                                            <td>
                                                {st.inst2}
                                            </td>
                                            <td>
                                                {st.inst3}
                                            </td>
                                            <td>
                                                {st.inst4}
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
                                                {st.grad}
                                            </td>
                                            <td>
                                                {st.sup}
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
                    <button type='submit' className='secondary-button' onClick={generatePdf}>
                        <FiPrinter className='card_icon' /> Download PDF
                    </button>
                </div>
            </div>
        </main>
    )

}

export default Solvability