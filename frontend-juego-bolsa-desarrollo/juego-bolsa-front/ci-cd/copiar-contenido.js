const fs = require('fs');
const arregloAmbiente = process.argv;
const produccion = arregloAmbiente.find((a) => a === 'prod');
const preProduccion = arregloAmbiente.find((a) => a === 'preprod');
const test = arregloAmbiente.find((a) => a === 'test');
const dev = arregloAmbiente.find((a) => a === 'dev');
const variablesEntorno = require('./configuracion-ip-puerto');
let url, port;
if (produccion) {
  url = variablesEntorno.prod.url;
  port = variablesEntorno.prod.port;
}
if (preProduccion) {
  url = variablesEntorno.preProd.url;
  port = variablesEntorno.preProd.port;
}
if (test) {
  url = variablesEntorno.test.url;
  port = variablesEntorno.test.port;
}
if (dev) {
  url = variablesEntorno.dev.url;
  port = variablesEntorno.dev.port;
}
console.log('flex', url, port);

try {
  let pathArchivo = '../src/environments/environment.prod.ts';
  if (dev) {
    pathArchivo = '../src/environments/environment.ts';
  }
  const contenidoArchivo = fs.readFileSync(pathArchivo, 'utf-8');
  const regexInicio = /(n*{)/;
  const indiceInicioString = regexInicio.exec(contenidoArchivo).index;
  const contenidoTextoJSON = contenidoArchivo.slice(indiceInicioString, contenidoArchivo.length - 1).replace(';', '');
  const jsonEnvironment = JSON.parse(contenidoTextoJSON);
  jsonEnvironment.url = url;
  jsonEnvironment.port = port;
  const contenidoNuevo = contenidoArchivo.slice(0, indiceInicioString) + JSON.stringify(jsonEnvironment) + ';\n';
  fs.writeFileSync(pathArchivo, contenidoNuevo);
} catch (e) {
  console.log('ERROR', e);
  throw new Error(e)
}
