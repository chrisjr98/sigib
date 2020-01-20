const fs = require('fs');
try {
  const contenidoArchivo = fs.readFileSync('../dist/juego-bolsa-front/index.html', 'utf-8');
  const indiceInicial = contenidoArchivo.indexOf('<!--EMPIEZA COPIAR-->');
  const indiceFinal = contenidoArchivo.indexOf('<!--TERMINA COPIAR-->');
  const arregloAmbiente = process.argv;
  const produccion = arregloAmbiente.find((a) => a === 'prod');
  const preProduccion = arregloAmbiente.find((a) => a === 'preprod');
  const test = arregloAmbiente.find((a) => a === 'test');
  const dev = arregloAmbiente.find((a) => a === 'dev');
  const variablesEntorno = require('./configuracion-usuario');
  let usuarioAReemplazar, directorio;

  if (produccion) {
    usuarioAReemplazar = variablesEntorno.prod.usuario,
      directorio = variablesEntorno.prod.directorio
  }
  if (preProduccion) {
    usuarioAReemplazar = variablesEntorno.preProd.usuario,
      directorio = variablesEntorno.preProd.directorio
  }
  if (test) {
    usuarioAReemplazar = variablesEntorno.test.usuario,
      directorio = variablesEntorno.test.directorio
  }
  if (dev) {
    usuarioAReemplazar = variablesEntorno.dev.usuario,
      directorio = variablesEntorno.dev.directorio
  }
  const textoPrincipio = contenidoArchivo.slice(0, indiceInicial);
  const textoFinal = contenidoArchivo.slice(indiceFinal + 21, contenidoArchivo.length - 1);
  const textoCompleto = textoPrincipio + usuarioAReemplazar + textoFinal;
  fs.writeFileSync(directorio, textoCompleto);
  console.log(textoCompleto);
} catch (e) {
  throw new Error(JSON.stringify({mensaje: 'Error leyendo archivo', error: e}))
}

