import React, { useEffect, useState } from "react";
import CityList from "./components/CitysList";
import './App.css';
import { useDispatch } from "react-redux";


function App() {

  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  useEffect(() => {
    addCity()
  }, [])

  function addCity() {
    let json = require('./city.list.json');
    let cityNameValue = input;
    const rez = JSON.parse(JSON.stringify(json))
    let resp = rez.filter(el => el.name.toLowerCase() === cityNameValue.toLowerCase())
    if (resp[0] != undefined) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&units=metric&APPID=bcf45506de72468c2a0cb7f9a26542bc`)
        .then(response => response.json())
        .then(data => dispatch({
          type: 'ADD_CITY',
          payload: { data: data }
        }))
    }
    else alert('Извините, но такого города в нашей базе нет');
    setInput('')
  }

  function handlyChange(event) {
    setInput(event.target.value);
  }


  return (
    <div className='main'>
      <div className='input'>
        <input type="text" placeholder='add city name' onChange={handlyChange} value={input} />
        <button onClick={() => addCity()}>add city</button>
      </div>
      <div><CityList /></div>
    </div>
  )
}


export default App;
