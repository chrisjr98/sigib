export const OPCIONES_MENU_INICIO = [
  {
    textoBoton: 'INFORMACIÓN',
    descripcionOpcion: 'Revisa calendario, académico y noticias.',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-info.png',
    dirigirA: ['../jugador']
  },
  {
    textoBoton: 'EMPEZAR',
    descripcionOpcion: 'Sistema de gestión para estudiantes, docente y administradores.',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-admin.png',
    dirigirA: ['../administrador/login']
  },
];

export const DATOS_LISTA_JUEGOS = [
  {
    nombre: 'Juego 1',
    estado: 'J',
    totalParticipantes: '17',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-info.jpeg'
  },
  {
    nombre: 'Juego 2',
    estado: 'CO',
    totalParticipantes: '27',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-info.jpeg'
  },
];

export const DATOS_VALORES_ACCIONES_AUSPICIANTES = {
  auspiciantes: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  valorAccionAuspiciantes: [65, 59, 80, 81, 56, 55, 40],
};

export const PATH_IMAGEN = 'assets/imagenes/opciones-menu-inicio/opcion-info.png';
