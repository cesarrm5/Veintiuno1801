import './style.css'
import _ from 'underscore';

let cartas = [];
let cartasJugador =[];
let puntajeJugador = 0;
const boton_juego = document.getElementById("boton_juegoNuevo");
const boton_pedir = document.getElementById("boton_Pedir");
const boton_parar = document.getElementById("boton_parar");
const jugador_div = document.getElementById("Jugador_Div");

boton_pedir.disabled = true;
boton_parar.disabled = true;


const crearCartas = ()=>{
  let figuras = ['C','D','H', 'S'];
  let numeros = ['2','3','4','5','6','7','8','9','10','A','J','K','Q'];
  let cartas = [];
  for (let i = 0; i < figuras.length; i++) {
    for (let j = 0; j < numeros.length; j++) {
      cartas.push(`${numeros[j]}${figuras[i]}`);
    }
  }
  cartas = _.shuffle(cartas);
  console.log(cartas)
  return cartas;
}

const juegoNuevo = ()=>{
  cartasJugador.map (carta =>{
    const elementoCarta = document.getElementById(carta);
    elementoCarta.remove();
  })
  cartas = crearCartas();
  cartasJugador = [];
  puntajeJugador = 0;
  boton_juego.disabled = true;
  boton_pedir.disabled = false;
  boton_parar.disabled = false;
}

const pedirCarta = () =>{
  let carta = cartas.pop();
  let puntaje = 0;
  cartasJugador.push(carta);

  const imagenCarta = document.createElement("img");
  imagenCarta.setAttribute('class', 'carta');
  imagenCarta.setAttribute('id',carta);
  imagenCarta.src = `assets/cartas/${carta}.png`;
  jugador_div.appendChild(imagenCarta);
  console.log(carta);
  console.log(typeof(carta));

  if (carta[0]=='J' || carta[0]=='K' || carta[0]=='Q'|| carta[0]=='1' ) puntaje = 10;
    else {
      if(carta[0]=='A'){
        if ((puntajeJugador+11)>21) puntaje = 1;
        else puntaje = 11;
      }
      else{
        puntaje = parseInt(carta[0])
      }
    }
  puntajeJugador =  puntajeJugador + puntaje;

  if (puntajeJugador > 21){
    boton_juego.disabled = false;
    boton_pedir.disabled = true;
    boton_parar.disabled = true;
    
    alert ("perdiste")
  }
    
  console.log(cartas);
  console.log(puntajeJugador);

}

boton_juego.addEventListener("click", juegoNuevo); 
boton_pedir.addEventListener("click", pedirCarta);