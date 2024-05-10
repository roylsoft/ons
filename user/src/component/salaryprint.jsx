import React, { useEffect, useState, useRef } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import moment from 'moment';
import { FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';


function Salaryprint() {
    const [data, setdata] = useState([])
    const [values, setValues] = useState({
        month: ""
    })
    const [value, setValue] = useState([]);

    const [speciality, setSpeciality] = useState([]);
    const [search, setSearch] = useState("");
    const [order, setorder] = useState("ASC");

    const payement = async () => {
        const url = 'http://localhost:3000/student/payement/data'
        axios.get(url, { params: { month: values.month } }
        )
            .then(result => {

                if (result.data.readingStatus) {
                    setValue(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        payement();
    };

    const handelDelete = (mat) => {
        axios.delete('http://localhost:3000/student/deletestudent/' + mat)
            .then(result => {
                if (result.data.deleteStatus) {
                    window.location.reload()
                } else {
                    alert(result.data.Error)
                }
            })
    }

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

    const handleCellChange = async (code, field, value) => {
        try {
            const valeur = value
            const colone = field
            console.log(code + " " + colone + " " + valeur);
            // Mettre à jour la valeur dans la base de données MySQL via une requête API
            await axios.put(`http://localhost:3000/student/sign/${code}`, { colone, valeur, month: values.month });

            // Mettre à jour les données localement
            setValue(prevValue =>
                prevValue.map(item =>
                    item.code === code ? { ...item, [field]: value } : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const pdf = useRef()

    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'staff\'s list',
        onAfterPrint: () => alert('staff\'s list saved successfully'),

    })

    return (
        <main className='main-container'>
            <div className='px-2 mt-3'>
                <div className='d-flex justify-content-center'>
                    <h3>Lecturers salaries</h3>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div class="row mt-1 mb-2">
                        <div class="col">
                            <p><h5>Choose the speciality and the month:</h5></p>
                        </div>

                        <div class="col">
                            <select type="select" onChange={(e) => setValues({ ...values, month: e.target.value })} name='month' autoComplete='off' placeholder='choose your level' className='form-control'>
                                <option value="">-- Month --</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">Jun</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>

                        </div>
                        <div class="col"> <button type='submit' className='btn btn-success'>Display</button></div>

                    </div>
                </form>

                <div class="row mt-1 mb-2">

                    <div class="col-5 mt-1 mb-2">
                        <p><h5>You can enter an ID to locate a specific lecturer: </h5></p>
                    </div>

                    <div class="col-3 mt-1 mb-2">
                        <input type="text" class="form-control"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..." />
                    </div>
                </div>
                <hr />
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
                    <div class='d-flex justify-content-center'>
                        <div class="row mt-1 mb-2">
                            <div class="col-4 mt-1 mb-2">
                                <p><h5>Salaries grid</h5></p>
                            </div>
                            <div class="col mt-1 mb-2">
                                <p>=====</p>
                            </div>
                            <div class="col mt-1 mb-2">
                                <p><h5>Month: </h5></p>
                            </div>
                            <div class="col mt-1 mb-2">
                                <input type="text" class="form-control "
                                    value={values.month}
                                />
                            </div>
                            <div class="col mt-1 mb-2">
                                {/* <p><h5>Level: </h5></p> */}
                            </div>
                            <div class="col mt-1 mb-2">
                                {/* <input type="text" class="form-control"
                                    value={values.level}
                                /> */}
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className='mt-2 ms-1 '>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Lecturer ID</th>

                                    <th>Name</th>
                                    <th>Course</th>
                                    <th className='bi-sort-up-alt' onClick={() => sorting("codesp")}>Speciality</th>
                                    <th>Level</th>
                                    <th>Price/hours</th>
                                    <th>T.Hours</th>
                                    <th>T.Amount</th>
                                    <th>Sign</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    value.filter(item => {
                                        return search.toLowerCase() === "" ?
                                            item : item.lecturer.toLowerCase().includes(search) ||
                                            item.codesp.toLowerCase().includes(search) ||
                                            item.code.toLowerCase().includes(search)
                                    }).map(st => (
                                        <tr key={st.code}>
                                            <td>{st.lecturer}</td>
                                            <td>{st.name}</td>
                                            <td>{st.code}</td>
                                            <td>{st.codesp}</td>
                                            <td>{st.level}</td>
                                            <td>{st.coasthour}</td>
                                            <td >{st.totalhour}</td>
                                            <td >{st.total}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={st.sign}
                                                    onChange={(e) => handleCellChange(st.code, 'sign', e.target.value)}
                                                    onBlur={(e) => handleCellChange(st.code, 'sign', e.target.value)}
                                                />
                                            </td>
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

export default Salaryprint