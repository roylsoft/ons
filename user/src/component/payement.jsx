import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";



function Payement() {
  const [data, setdata]=useState([])
  const [values, setValues]=useState({
    month:""
  })
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setorder] = useState("ASC");

  const payement = async () => {
     const url='https://admin-rust-gamma.vercel.app/student/payement/data'
      axios.get(url,{params:{month:values.month}}
      )
      .then(result=>{
        
        if (result.data.readingStatus) {
          setValue(result.data.Result)
        }else{
          alert(result.data.Error)
        }
      }).catch(err=>console.log(err))
  
  };  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    payement();
  };

  useEffect(()=>{
    axios.get('https://admin-rust-gamma.vercel.app/auth/specialities')
    .then(result=>{
      if (result.data.readingStatus) {
        setSpeciality(result.data.Result)
      }else{
        alert(result.data.Error)
      } 
    }).catch(err=>console.log(err))
  },[])

  const sorting=(col)=>{
    if (order === "ASC"){
      const sorted=[...data].sort((a,b) => 
        a[col].toLowerCase() > b[col].toLowerCase()? 1 : -1
      );
      setdata(sorted)
      setorder("DSC")
    }
    if (order === "DSC"){
      const sorted=[...data].sort((a,b) => 
        a[col].toLowerCase() > b[col].toLowerCase()? 1 : -1
      );
      setdata(sorted)
      setorder("ASC")
    }
  }

  const handleCellChange = async (code, field, value) => {
    try {
        const valeur=value
        const colone=field
        console.log(code +" "+colone+" "+valeur);
      // Mettre à jour la valeur dans la base de données MySQL via une requête API
      await axios.put(`https://admin-rust-gamma.vercel.app/student/sign/${code}`, { colone, valeur, month:values.month });

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
              <select type="select" onChange={(e)=>setValues({...values,month:e.target.value})} name='month' autoComplete='off' placeholder='choose your level' className='form-control'>
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
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search..."/>
          </div>
        </div>
      
       <div className='mt-2 ms-1 '>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Lecturer ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Course</th>
              <th className='bi-sort-up-alt' onClick={()=>sorting("codesp")}>Speciality</th>
              <th>Level</th>
              <th>Price/hours</th>
              <th>T.Hours</th>
              <th>T.Amount</th>
              <th>Sign</th>
            </tr>
          </thead>
          <tbody>
            {
              value.filter(item =>{ return search.toLowerCase()=== ""?
              item : item.lecturer.toLowerCase().includes(search) ||
              item.codesp.toLowerCase().includes(search) ||
              item.code.toLowerCase().includes(search)}).map( st =>(
                <tr key={st.code}>
                  
                  <td>{st.lecturer}</td>
                  <td>{st.name}</td>
                  <td>{st.phone}</td>
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
    </main>
  )
  
}

export default Payement