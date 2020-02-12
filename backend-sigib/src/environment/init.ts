/* tslint:disable */
import { CONFIG_ENVIRONMENT } from './config';

export async function init() {
  let existeArchivoLocal = false;
  let config;
  try {
    config = require('./local.ts').CONFIG_ENVIRONMENT;
    existeArchivoLocal = true;
    // console.log('Hay local', config);
  } catch (e) {
    console.debug({
      mensaje: 'No hay local',
    });
  }

  if (existeArchivoLocal) {
    // realizar cualquier tipo de configuración de producción aquí
    CONFIG_ENVIRONMENT.dbConnections = config.dbConnections;
    CONFIG_ENVIRONMENT.puertoLevanta = config.puertoLevanta;
    CONFIG_ENVIRONMENT.urls = config.urls;
    CONFIG_ENVIRONMENT.graphqlModule = config.graphqlModule;
    CONFIG_ENVIRONMENT.expressSession = config.expressSession;
    CONFIG_ENVIRONMENT.seguridad = config.seguridad;
    CONFIG_ENVIRONMENT.auth0 = config.auth0;
    CONFIG_ENVIRONMENT.auth0PasswordLogin = config.auth0PasswordLogin;
  } else {
    // No hacer nada
  }
  console.debug({
    mensaje: 'Antes del puerto',
  });
  const puerto = extraerParametro('port');
  console.debug({
    mensaje: 'Despues del puerto',
    data: {
      puerto: puerto,
    },
  });
  if (puerto) {
    CONFIG_ENVIRONMENT.puertoLevanta = puerto;
  }

  console.debug({
    mensaje: 'Configuracion',
    data: CONFIG_ENVIRONMENT,
  });
}

function extraerParametro(nombreParametro: string): string {
  console.debug({
    mensaje: 'Nombre parametro',
    data: {
      nombreParametro,
    },
  });
  const arregloAmbiente = process.argv;
  console.debug({
    mensaje: 'Nombre parametro',
    data: {
      nombreParametro,
    },
  });
  console.debug({
    mensaje: 'process.argv',
    data: {
      argumentos: process.argv,
    },
  });
  let valorARetornar;
  arregloAmbiente.forEach(parametro => {
    if (parametro.includes(nombreParametro)) {
      const valor = parametro.split('=')[1];
      console.log(valor);
      valorARetornar = valor;
    }
  });
  return valorARetornar;
}
