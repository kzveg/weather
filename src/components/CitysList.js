import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getFirstData } from '../redux/actions';
import CloseIcon from '@mui/icons-material/Close';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



function CityList() {
    let items = useSelector((state) => state.citys);
    let content;
    const [weather, setWeather] = useState(true); // what we rendering
    const [dataCity, setDataCity] = useState([]); // what city open to show full weather
    const dispatch = useDispatch();

    useEffect(() => {
        getFirstData()
    }, [])

    if (items != undefined) {

    }
    let card = items.map(el =>
        <Card sx={{ maxWidth: 280 }} onClick={() => showWeather(el)}>
            <div className="cardWrapper" >
                <CardMedia
                    component="img"
                    alt="weather"
                    height="140"
                    src="https://t3.ftcdn.net/jpg/02/11/52/42/360_F_211524227_Ett8aboQvVnROAFtqu3S1pW99Y3Th9vm.jpg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h3" component="div">
                        {el.data.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        температура воздуха: {Math.floor(el.data.main.temp)}
                        <br />
                        скорость ветра: {el.data.wind.speed}
                    </Typography>
                </CardContent>
            </div>
        </Card >)

    const updateWeather = (el) => dispatch => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${el.data.name}&units=metric&APPID=bcf45506de72468c2a0cb7f9a26542bc`)
            .then(response => response.json())
            .then(data => dispatch({
                type: 'UPDATE_CITY',
                payload: { data: data }
            }))
    }

    function deleteCity() {
        dispatch({
            type: 'DELETE_CITY',
            payload: dataCity.data.id
        })
        showCitys()
    }
    function showCitys() {
        setWeather(!weather)
    }

    function showWeather(el) {
        setDataCity(el)
        setWeather(!weather)
    }

    function getFirstData() {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&units=metric&APPID=bcf45506de72468c2a0cb7f9a26542bc')
            .then(response => response.json())
            .then(data => dispatch({
                type: 'ADD_CITY',
                payload: { data: data }
            }))

    }

    weather ?
        content = < div className='citys' > {card} </div > :
        content = < div >
            <div className='showcity'>
                <div className='close'><CloseIcon onClick={() => showCitys()} cursor='pointer' /></div>
                <div className='showcity-name'>
                    < AutorenewIcon sx={{ fontSize: 30 }} onClick={() => updateWeather(dataCity)} cursor='pointer' />
                    {dataCity.data.name}
                    <DeleteForeverIcon color="warning" sx={{ fontSize: 40 }} onClick={() => deleteCity()} cursor='pointer' />
                </div>
                <div className='showcity-description'>
                    <ul className='ul'>
                        <li> температура: {Math.floor(dataCity.data.main.temp)} </li>
                        <li>температура(Max): {Math.floor(dataCity.data.main.temp_max)}</li>
                        <li> температура(Min): {Math.floor(dataCity.data.main.temp_min)}</li>
                        <li> описание: {dataCity.data.weather[0].description}</li>
                        <li>скорость ветра: {dataCity.data.wind.speed}</li>
                        <li>влажность: {dataCity.data.main.humidity} %</li>
                        <li> давление: {dataCity.data.main.pressure} гПа</li>
                        <img src='https://cdn.dribbble.com/users/1353252/screenshots/7430583/media/f456446ffc1c9a1608b94d6d136dbc0d.gif' alt="icon" className='icon' />
                    </ul>
                </div>
            </div>
        </div >


    return (
        <div >{content}</div>
    )

}



export default CityList;