const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let puntuacion = 0;

const desafíos = [
  {
    nivel: "Básico",
    pregunta: "Escribe una función que reciba un arreglo de números y devuelva la suma de todos los elementos pares.",
    ejemplo: "[1, 2, 3, 4] => 6",
    pista: "Usa `.filter()` y `.reduce()` o un bucle `for`.",
    evaluar: (respuesta) => {
      const test = [1, 2, 3, 4];
      try {
        eval(respuesta); // define la función en tiempo real
        return typeof sumaPares === "function" && sumaPares(test) === 6;
      } catch {
        return false;
      }
    },
    puntos: 10,
  },
  {
    nivel: "Intermedio",
    pregunta: "Dado un string, cuenta cuántas veces aparece cada letra (ignora mayúsculas/minúsculas).",
    ejemplo: `"Hello" => { h: 1, e: 1, l: 2, o: 1 }`,
    pista: "Convierte a minúsculas y recorre con `forEach`.",
    evaluar: (respuesta) => {
      const test = "Hello";
      try {
        eval(respuesta);
        const result = contarLetras(test);
        return result.l === 2 && result.h === 1 && result.e === 1 && result.o === 1;
      } catch {
        return false;
      }
    },
    puntos: 15,
  },
  {
    nivel: "Avanzado",
    pregunta: "Crea una función que determine si una cadena es un palíndromo, ignorando espacios y signos.",
    ejemplo: `"Anita lava la tina" => true`,
    pista: "Limpia la cadena con regex y compárala con su reverso.",
    evaluar: (respuesta) => {
      const test = "Anita lava la tina";
      try {
        eval(respuesta);
        return esPalindromo(test) === true;
      } catch {
        return false;
      }
    },
    puntos: 20,
  },
];

let índice = 0;

function preguntar() {
  if (índice >= desafíos.length) {
    console.log("\n¡Simulación finalizada!");
    console.log(`Tu puntuación total es: ${puntuacion}`);
    if (puntuacion < 20) console.log("Nivel: Principiante");
    else if (puntuacion < 40) console.log("Nivel: Intermedio");
    else if (puntuacion < 60) console.log("Nivel: Avanzado");
    else console.log("¡Nivel: Ninja JS!");
    rl.close();
    return;
  }

  const d = desafíos[índice];
  console.log(`\nNivel: ${d.nivel}`);
  console.log(`Desafío: ${d.pregunta}`);
  console.log(`Ejemplo: ${d.ejemplo}`);
  rl.question("¿Necesitas una pista? (s/n): ", (pistaRespuesta) => {
    if (pistaRespuesta.toLowerCase() === "s") {
      console.log(`Pista: ${d.pista}`);
    }

    rl.question("Escribe tu función (ej. function sumaPares(arr) {...}):\n", (respuestaUsuario) => {
      const correcta = d.evaluar(respuestaUsuario);
      if (correcta) {
        console.log("¡Correcto!");
        puntuacion += d.puntos;
      } else {
        console.log("Incorrecto. Intenta revisar tu lógica.");
      }
      índice++;
      preguntar();
    });
  });
}

console.log("=== Simulador de Resolución de Problemas en JavaScript ===");
preguntar();
