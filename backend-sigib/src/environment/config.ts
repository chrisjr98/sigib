/* tslint:disable */
export const CONFIG_ENVIRONMENT: any = {
  production: false,
  dbConnections: {
    crearDatosPrueba: true,
    mysql: {
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: '3Gr9XN19SV',
      password: 'v2Nf2tCusS',
      database: '3Gr9XN19SV',
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
  puertoLevanta: 3000,
  urls: {
    protocolo: 'https',
    ip: '3000-fd4ab095-b3f6-42da-b85f-61b02c2e4306.ws-us02.gitpod.io',
    puertoEscucha:'',
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
