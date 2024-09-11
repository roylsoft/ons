import axios from "axios";
import React, { useEffect, useState } from "react";


const Key = () => {

  const [value, setValue] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const generateRandomNumber = () => {
    const min = 10000;
    const max = 99999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
    cle()
  };

  const cle = () => {

    axios.put('http://localhost:3001/auth/editregistrationkey', { randomNumber })
      .then(result => {
        if (result.data.createStatus) {
          setValue(result.data.Result)
          
        } else {
          console.log(result.data.Error)
        }
      })
  }


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-60 border loginForm'>

        <div>
          <button className='secondary-button round-0 mb-2' onClick={generateRandomNumber}>
            Generate a new Key</button>
        </div><div>
          <button className='secondary-button round-0 mb-2'>
            Use this Key: {value}
          </button>
        </div>

      </div>

    </div>

  );
};

export default Key;