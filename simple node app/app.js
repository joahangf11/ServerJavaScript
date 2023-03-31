const express = require('express');

const app = express();
const port = 8080;
const ipAddr = '54.145.216.60';

app.use(express.static(__dirname + '/public'));

app.get('/prueba.txt',(req,res) => {
  res.type('text/plain');
  res.send('hola mundo');
});

app.get('/hola/:nombre',(req,res) => {
  let n = req.params.nombre;
  res.type('text/plain');
  //res.status(200)
  res.send(`Hola ${n}, Buenas Tardes.`);
});

app.get('/gcd/:num1/:num2',(req,res) =>{
  let x = parseInt(req.params.num1);
  let y = parseInt(req.params.num2);
  if (isNaN(x) || isNaN(y)){
    res.json({status:'error', message: 'Al menos uno de los valores de entrada no es un número'})
  } else{
    res.json({status: 'ok', result: gcd(x,y)});
  }
});

function gcd(a,b){
  while (b != 0){
    [a,b] = [b, a % b];
  }
  return a;
}


//custom 404 page not found
app.use((req,res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(port,() => {
  console.log(`Express iniado en http:${ipAddr}:${port}` + '\nPresiona Ctrl-C para terminar');
})