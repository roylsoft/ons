import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { FiPrinter } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';


function Markprint() {
    const [speciality, setSpeciality] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(40);
    const [searchTerm, setSearchTerm] = useState('');
    const [editedValues, setEditedValues] = useState({});
    const [data, setdata] = useState([]);
    const [columns, setColumns] = useState([]);
    const [values, setValues] = useState({
        branch: "",
        year: "",
        spec: "",
        semester: "",
        session: "",
        level: ""
    })

    const sortMark = async () => {
        const url = 'http://localhost:3001/auth/marksort/data';
        try {
            const response = await axios.get(url, {
                params: {
                    branch: values.branch,
                    year: values.year,
                    spec: values.spec,
                    session: values.session,
                    semester: values.semester,
                    level: values.level,
                    page: currentPage,
                    perPage: perPage,
                    search: search,
                },
            });
            const result = Array.isArray(response.data.result) ? response.data.result : Array.from(response.data.result);
            setdata(result);
            const dynamicColumns = Object.keys(result[0] || {}).map((key) => ({
                name: key,
                selector: key,
                editable: true,
            }));
            setColumns(dynamicColumns);

        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sortMark();
    };

    useEffect(() => {
        axios.get('http://localhost:3001/auth/specialities')
            .then(result => {
                if (result.data.readingStatus) {

                    setSpeciality(result.data.Result)
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, []);

    const pdf = useRef()

    const generatePdf = useReactToPrint({
        content: () => pdf.current,
        documentTitle: 'marks',
        onAfterPrint: () => alert('marks saved successfully'),

    })

    return (
        <main className='main-container'>
            <div className='px-2 mt-3'>

                <form action="" onSubmit={handleSubmit}>
                    <div class="row mt-1 mb-2 form-group">
                        <div class="col">
                            <select type='select' name="spec" onChange={(e) => setValues({ ...values, spec: e.target.value })} className='form-control'>
                                <option value="">--Speciality--</option>
                                {speciality.map(sp => (
                                    <option key={sp.codesp} value={sp.codesp}>{sp.title}</option>
                                ))}
                            </select>

                        </div>
                        <div class="col">
                            <select type="select" onChange={(e) => setValues({ ...values, level: e.target.value })} name='level' autoComplete='off' placeholder='choose your level' className='form-control'>
                                <option value="">--level--</option>
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

                        <div class="col">
                            <select type="select" onChange={(e) => setValues({ ...values, session: e.target.value })} name='session' autoComplete='off' placeholder='choose your session' className='form-control'>
                                <option value="">--Session--</option>
                                <option value="CA">CA</option>
                                <option value="EXAM">EXAM</option>

                            </select>

                        </div>
                        <div class="col mb-2">
                            <select type="select" onChange={(e) => setValues({ ...values, semester: e.target.value })} name='semester' autoComplete='off' placeholder='choose your semester' className='form-control'>
                                <option value="">--Semester--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                            </select>

                        </div>
                    </div>
                    <div class="form-group">
                        <select type="select" onChange={(e) => setValues({ ...values, branch: e.target.value })}
                            name='branch' autoComplete='off' placeholder='choose your branch' className='form-control rounded-2'>
                            <option value="">-- Select the branch--</option>
                            <option value="Madagascar">Madagascar(Main)</option>
                            <option value="Odza">Odza</option>
                            <option value="Olembe">Olembe</option>
                            <option value="Ngousso">Ngousso</option>
                            <option value="Bafia">Bafia</option>
                            <option value="Maroua">Maroua</option>
                            <option value="Foumbot">Foumbot</option>
                            <option value="Nkambe">Nkambe</option>
                            <option value="Douala">Douala</option>
                        </select>
                        <select type="select" onChange={(e) => setValues({ ...values, year: e.target.value })}
                            name='year' autoComplete='off' placeholder='academic year' className='form-control rounded-2'>
                            <option value="">-- Select the academic year--</option>
                            <option value="2024_2025">2024/2025</option>
                            <option value="2025_2026">2025/2026</option>
                            <option value="2026_2027">2026/2027</option>
                            <option value="2027_2028">2027/2028</option>
                            <option value="2028_2029">2028/2029</option>
                        </select>
                        <div class="d-flex justify-content-md-end"> <button type='submit' className='btn d-end'>Display</button></div>
                    </div>

                </form>
                <div className='mt-2 ms-1 '>
                    <hr />
                    <div ref={pdf} style={{ width: '95%', marginLeft: '2%', marginRight: '3%', marginTop: '8%' }}>
                        <div class="row mt-1 mb-2 d-flex justify-content-center">
                            <div class="col-5 d-flex justify-content-center">
                                <p>REPUBLIC OF CAMEROON <br /><i>Peace-Work-Fatherland</i> <br />***** <br />MINISTRY OF HIGHER EDUCATION<br />*****<br />UNIVERSITY OF BAMENDA <br /> <i>Training - Pobity - Entrepreneurship</i></p>
                            </div>
                            <div class="col-2 d-flex justify-content-center">
                                <img src={'../../public/nfonap.png.png'} alt="" className='logo' />
                            </div>
                            <div class="col-5 d-flex justify-content-center">
                                <p>NFONAP-HIEPS<br /><i>Training-development-expertise</i><br />*****<br />The Dean's Office <br />***** <br />P.O Box:2368 Messa-Yaounde <br />E-mail: <u>info@nfonap.education</u> <br />Registration: <u>www.nfonap.net</u><br />website: <u>www.nfonap.education</u> <br />Tel: <u>675550570 / 672545135</u></p>
                            </div>
                        </div>
                        <div class='d-flex justify-content-center'>
                            <div class="row mt-1 mb-2 form-group">
                                <div class="col mt-1 mb-2">
                                    <h6>Speciality:</h6>
                                    <input type="text" class="form-control "
                                        value={values.spec}
                                    />
                                </div>

                                <div class="col mt-1 mb-2">
                                    <h6>Level:</h6>
                                    <input type="text" class="form-control"
                                        value={values.level}
                                    />
                                </div>

                                <div class="col mt-1 mb-2">
                                    <h6>Semester:</h6>
                                    <input type="text" class="form-control"
                                        value={values.semester}
                                    />
                                </div>

                                <div class="col mt-1 mb-2">
                                    <h6>Session:</h6>
                                    <input type="text" class="form-control"
                                        value={values.session}
                                    />
                                </div>

                            </div>
                        </div>
                        <hr />

                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    {Object.keys(data[0] || {}).map((column, colindex) => (
                                        <th key={column}>{column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data
                                    .filter((item) => {
                                        return search.toLowerCase() === "" ? item : item.mat1.toLowerCase().includes(search);
                                    }).sort((a, b) => a.name.localeCompare(b.name))
                                    .map((row, rowindex) => (
                                        <tr key={rowindex}>
                                            {Object.entries(row).map(([key, value], index) => (
                                                <td key={index}>{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </div>
                    <div class="d-md-flex justify-content-md-end">
                        <button type='submit' className='secondary-button' onClick={generatePdf}>
                            <FiPrinter className='card_icon' /> Download PDF
                        </button>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className='btn btn-primary me-md-2' onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                        <button className='btn btn-info' onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </div>

                </div>
            </div>
        </main>
    )

}
export default Markprint;