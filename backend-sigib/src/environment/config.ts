/* tslint:disable */
export const CONFIG_ENVIRONMENT: any = {
  production: false,
  dbConnections: {
    crearDatosPrueba: true,
    mysql: {
      type: 'mysql',
      host: 'localhost',
      port: 30720,
      username: 'sigib',
      password: '12345678',
      database: 'sigib',
      synchronize: true,
      retryDelay: 40000,
      retryAttempts: 3,
      connectTimeout: 40000,
      keepConnectionAlive: true,
      dropSchema: true,
      charset: 'utf8mb4',
      timezone: 'local',
      ssl: false,
    },
  },
  puertoLevanta: 8080,
  urls: {
    protocolo: 'http',
    ip: 'localhost',
    puertoEscucha: 8080,
    segmento: '/',
    url() {
      return `${this.protocolo}://${this.ip}:${this.puertoEscucha}${
        this.segmento
      }`;
    },
    callbackUrl() {
      return this.url() + 'callback';
    },
    logoutUrl() {
      return this.url() + 'front-app';
    },
    frontEndUrl() {
      return this.url() + 'front-app';
    },
    frontEndUrlDev() {
      return this.url() + 'front-dev';
    },
    frontEndSegmento() {
      return this.url() + 'front-app';
    },
    frontEndSegmentoDev() {
      return this.url() + 'front-dev';
    },
    frontEndSegmentoLogin() {
      return this.url() + 'login';
    },
  },
  expressSession: {
    secret: '$secretro1',
    cookie: {},
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
  },
  crearDatosPrueba: true,
  seguridad: false,
};
