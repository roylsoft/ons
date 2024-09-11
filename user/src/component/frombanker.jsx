import React, { useEffect, useRef, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useReactToPrint } from 'react-to-print'
import { FiPrinter } from "react-icons/fi";
import moment from 'moment';

function Solvability1() {

    const pdf = useRef()

    const [route, setsuite] = useState("");
    let way = location.pathname
    let words = way.split("/")
    let code = words.pop();

    const [student, setStudent] = useState([])
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
    const [speciality, setSpeciality] = useState()

    const solvability1 = async () => {
        const k = "1910sourceeva1606"
        const k1 = "1910sourceVally1606"
        if (values.cle === k || values.cle === k1) {
            const url = 'http://localhost:3001/auth/solvability/data'
            axios.get(url, { params: { mat: values.mat } }
            )
                .then(result => {
                    console.log(result.data.readingStatus);
                    if (result.data.readingStatus) {
                        setValue(result.data.Result)
                        setStudent(result.data.Result[0])
                        console.log(student);
                        console.log(value);
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

    const numero = () => {
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
        numero()
        solvability1();

    };


    useEffect(() => {
        axios.get('http://localhost:3001/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {
                    console.log(result.data.Result);
                    setSpeciality(result.data.Result)

                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])


    const handleCellChange = async (mat, field, value) => {
        try {
            const valeur = parseInt(value)
            const colone = field
            // Mettre à jour la valeur dans la base de données MySQL via une requête API
            await axios.put(`http://localhost:3001/auth/solvability/${mat}`, { mat: values.mat, colone, valeur, codesp: values.codesp, year: values.year });

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

    return (
        <main className='main-container'>
            <div className='justify-content-center align-items-center px-5 mt-2'>
                <div className='d-flex mb-3 justify-content-center'>
                    <h3>School Fees</h3>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <input type="text" class="form-control"
                            name="mat" onChange={(e) => setValues({ ...values, mat: e.target.value })}
                            placeholder="Student UId" />
                        <label htmlFor="year"><strong>Academic year<span className='start'>*</span></strong></label>
                        <select type="select" onChange={(e) => setValues({ ...values, year: e.target.value })}
                            name='year' autoComplete='off' placeholder='academic year' className='form-control rounded-2'>
                            <option value="">-- Select  the academic year--</option>
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


                        <div class=""> <button type='submit' className='secondary-button'>Display</button></div>

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
                            Full name: {student.name} <br />
                            Student UID : {student.mat} <br />
                            Speciality : {student.codesp} <br />
                            Level : {student.level}
                        </div>
                        <div class="col-2 d-flex justify-content-center">
                            Academic Year: {values.year}<br />
                        </div>
                        <div class="col-5 d-flex justify-content-center">
                            <div class="col-2 d-flex justify-content-center"> <strong>Class BMD/{student.codesp}{student.level}</strong>   </div>
                        </div>
                    </div>


                    <div className='mt-2 ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    {/* <th style={{ backgroundColor: 'black', color: 'white' }}>Student's UId</th> */}
                                    {/* <th style={{ backgroundColor: 'black', color: 'white' }}>Name</th> */}
                                    {/* <th style={{ backgroundColor: 'black', color: 'white' }}>Level</th> */}
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>Registration</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>1st Instalment</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>2nd Instalment</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>3rd Instalment</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>4th Instalment</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>5th Instalment</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.map(st => (
                                        <tr key={st.mat}>
                                            {/* <td>{st.mat}</td> */}
                                            {/* <td>{st.name}</td> */}
                                            {/* <td>{st.level}</td> */}
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.reg}
                                                    onChange={(e) => handleCellChange(st.mat, 'reg', e.target.value)}

                                                // // onBlur={(e) => handleCellChange(st.mat, 'reg', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.inst1}
                                                    onChange={(e) => handleCellChange(st.mat, 'inst1', parseInt(e.target.value))}

                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.inst2}
                                                    onChange={(e) => handleCellChange(st.mat, 'inst2', parseInt(e.target.value))}
                                                //    // onBlur={(e) => handleCellChange(st.mat, 'inst2', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    // value={st.inst3}
                                                    onChange={(e) => handleCellChange(st.mat, 'inst3', parseInt(e.target.value))}
                                                // onBlur={(e) => handleCellChange(st.mat, 'inst3', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.inst4}

                                                    onChange={(e) => handleCellChange(st.mat, 'inst4', parseInt(e.target.value))}
                                                // onBlur={(e) => handleCellChange(st.mat, 'inst4', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.inst5}

                                                    onChange={(e) => handleCellChange(st.mat, 'inst5', parseInt(e.target.value))}
                                                // onBlur={(e) => handleCellChange(st.mat, 'inst5', parseInt(e.target.value))}
                                                />
                                            </td>


                                        </tr>

                                    ))
                                }
                            </tbody>
                        </Table>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>Reduction</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>University Tuition</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>Graduation</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>Supervision</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>Practical</th>
                                    <th style={{ backgroundColor: 'black', color: 'white' }}>VALIDATE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.map(st => (
                                        <tr key={st.mat}>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.red}
                                                    onChange={(e) => handleCellChange(st.mat, 'red', parseInt(e.target.value))}
                                                // onBlur={(e) => handleCellChange(st.mat, 'red', parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.univ}

                                                    onChange={(e) => handleCellChange(st.mat, 'univ', e.target.value)}
                                                // onBlur={(e) => handleCellChange(st.mat, 'univ', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.grad}

                                                    onChange={(e) => handleCellChange(st.mat, 'grad', e.target.value)}
                                                // onBlur={(e) => handleCellChange(st.mat, 'grad', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.sup}
                                                    onChange={(e) => handleCellChange(st.mat, 'sup', e.target.value)}
                                                // onBlur={(e) => handleCellChange(st.mat, 'sup', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={st.prac}
                                                    onChange={(e) => handleCellChange(st.mat, 'prac', e.target.value)}
                                                // onBlur={(e) => handleCellChange(st.mat, 'prac', e.target.value)}
                                                />
                                            </td>
                                            <td><button className='secondary-button'>OK</button></td>
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
                        <div class="col-5 d-flex justify-content-center">The student: <br /> {student.name}</div>
                        <div class="col-2"></div>
                        <div class="col-5 d-flex justify-content-center">The accoutant</div>
                    </div>
                    <hr />
                    <div class="row mt mx-5 mb">
                        <p className='d-flex justify-content-center'>This receipt NFONAP{num}HIEPS is delivered in only one copy.
                            Copy@right-2023 NFONAP-HIEPS {date}</p>
                    </div>
                </div>
            </div>
        </main>
    )

}

export default Solvability1