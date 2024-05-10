import React, { useEffect, useRef, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useReactToPrint } from 'react-to-print'
import { FiPrinter } from "react-icons/fi";
import moment from 'moment';

function Feesboard() {

    const pdf = useRef()

    const [data, setdata] = useState([])
    const [student, setStudent] = useState([])
    const [values, setValues] = useState({
        codesp: "",
        level:""
    })
    const [value, setValue] = useState([]);
    

    const [speciality, setSpeciality] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setorder] = useState("ASC");
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const cdate = new Date();
    const date = moment(cdate).format('DD/MM/YYYY hh:mm:ss');



    const solvability = async () => {
        const url = 'http://localhost:3000/student/feesboard/data'
        axios.get(url, { params: { codesp: values.codesp, level: values.level  } }
        )
            .then(result => {

                if (result.data.readingStatus) {
                    setValue(result.data.Result)
                    setStudent(result.data.Result[0])
                 
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        solvability();
    };


    useEffect(() => {
        axios.get('http://localhost:3000/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {
                    setSpeciality(result.data.Result)
                    

                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])

    const sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setdata(sorted)
            setorder("DSC")
        }
        if (order === "DSC") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setdata(sorted)
            setorder("ASC")
        }
    }

    const handleCellChange = async (mat, field, value) => {
        try {
            const valeur = value
            const colone = field
            console.log(mat + " " + colone + " " + valeur);
            // Mettre à jour la valeur dans la base de données MySQL via une requête API
            await axios.put(`http://localhost:3000/student/solvability/${mat}`, { colone, valeur, codesp: values.codesp });

            // Mettre à jour les données localement
            setValue(prevValue =>
                prevValue.map(item =>
                    item.mat === mat ? { ...item, [field]: value } : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'fees',
        onAfterPrint: () => alert('fees saved successfully'),

    })

    let total=student.reg + student.inst1 + student.inst2 + student.inst3 + student.inst4 + student.inst5


    return (
        <main className='main-container'>
            <div className='px-2 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>School Fees</h3>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div class="row mt-1 mb-2">
                        <div class="col">
                            <p><h5>Choose the speciality and the month:</h5></p>
                        </div>

                        <div class="col">
                            <select type='select' name="codesp" onChange={(e) => setValues({ ...values, codesp: e.target.value })} className='form-control'>
                                <option value="">-- Select speciality/field--</option>
                                {speciality.map(sp => (
                                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col">
                            <select type="select" onChange={(e) => setValues({ ...values, level: e.target.value })} name='level' autoComplete='off' placeholder='choose your level' className='form-control'>
                                <option value="">-- Select level--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>

                        </div>


                        <div class="col"> <button type='submit' className='btn btn-success'>Display</button></div>

                    </div>
                </form>
                <hr />
                <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', marginTop: '8%' }}>
                    <div class="row mt-1 mb-2 d-flex justify-content-center">
                        <div class="col-5 d-flex justify-content-center">
                            <p>REPUBLIC OF CAMEROON <br /><i>Peace-Work-Fatherland</i> <br />***** <br />MINISTRY OF HIGHER EDUCATION<br />*****<br />UNIVERSITY OF BAMENDA <br /> <i>Training - Pobity - Entrepreneurship</i> <br /> <br /> <b><h6>Receipt</h6></b></p>
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
                            Speciality: {student.codesp} <br />
                           
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            Academic Year: {currentYear}/{nextYear}<br />
                        </div>
                        <div class="col-5 d-flex justify-content-center">
                            <div class="col-2 d-flex justify-content-center"> <strong>Class: {student.codesp} {student.level}</strong>   </div>
                        </div>
                    </div>


                    <div className='mt-2 ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Student's UId</th>
                                    <th>Student's name</th>
                                    <th>Registration</th>
                                    <th>1st Inst</th>
                                    <th>2nd Inst</th>
                                    <th>3rd Inst</th>
                                    <th>4th Inst</th>
                                    <th>5th Inst</th>
                                    <th>Univ Tui</th>
                                    <th>Graduation</th>
                                    <th>Supervision</th>
                                    <th>Practical</th>
                                    <th>Total</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.filter(item => {
                                        return search.toLowerCase() === "" ?
                                            item : item.mat.toLowerCase().includes(search) ||
                                            item.codesp.toLowerCase().includes(search)

                                    }).map(st => (
                                        <tr key={st.mat}>
                                            <td>{st.mat}</td>
                                            <td>{st.name}</td>
                                           
                                            <td>{st.reg}</td>
                                            <td>{st.inst1}</td>
                                            <td>{st.inst2}</td>
                                            <td>{st.inst3}</td>
                                            <td>{st.inst4}</td>
                                            <td>{st.inst5}</td>
                                            <td>{st.univ}</td>
                                            <td>{st.grad}</td>
                                            <td>{st.sup}</td>
                                            <td>{st.prac}</td>
                                            <td>{parseInt(st.reg)+parseInt(st.inst1)+parseInt(st.inst2)+parseInt(st.inst3)+parseInt(st.inst4)+parseInt(st.inst5)+parseInt(st.univ)+parseInt(st.grad)+parseInt(st.sup)+parseInt(st.prac)}</td>

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
                        {/* <div class="col-5 d-flex justify-content-center">Class: {speciality.title}</div> */}
                        <div class="col-2"></div>
                        <div class="col-5 d-flex justify-content-center">The accountant</div>
                    </div>
                    <hr />
                    <div class="row mt mx-5 mb">
                        <p className='d-flex justify-content-center'>
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

export default Feesboard