let json = require('./city.list.json');
let city = 'poltava';
const rez = JSON.parse(JSON.stringify(json))
let itog = rez.filter(el => el.name.toLowerCase() === city.toLowerCase())
console.log(itog);


