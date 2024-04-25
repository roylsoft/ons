import axios from "axios";
import React, { useEffect, useState } from "react";


const Key = () => {
  
  const [value, setValue] = useState({});
  const [randomNumber, setRandomNumber] = useState(null);
  const generateRandomNumber = () => {
    const min = 10000;
    const max = 99999;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandomNumber(randomNum);
    setValue(randomNumber)
    console.log(randomNumber);
    cle()
  };

  const cle = () => {
    axios.post('http://localhost:3000/auth/key', {randomNumber})
      .then(result => {
        if (result.data.loginStatus) {
          console.log(result.data);
        } else {
          console.log(result.data.Error)
        }
      })
  }

  
  

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
      <div className='p-3 rounded w-60 border loginForm'>


        <div>
          <button className='btn btn-success w-100 round-0 mb-2' onClick={generateRandomNumber}>
            Generate a new Key</button>
          {randomNumber && <p>Random Number: {randomNumber}</p>}
        </div>

      </div>

    </div>

  );
};

export default Key;