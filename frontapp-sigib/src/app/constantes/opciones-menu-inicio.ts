export const OPCIONES_MENU_INICIO = [
  {
    textoBoton: 'JUGAR',
    descripcionOpcion: 'Empieza el juego con los demas participantes.',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-jugar.png',
    dirigirA: ['../jugador']
  },
  {
    textoBoton: 'ADMINISTRAR',
    descripcionOpcion: 'Administrar los juegos iniciados.',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-admin.png',
    dirigirA: ['../administrador']
  },
];

export const DATOS_LISTA_JUEGOS = [
  {
    nombre: 'Juego 1',
    estado: 'J',
    totalParticipantes: '17',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-jugar.jpeg'
  },
  {
    nombre: 'Juego 2',
    estado: 'CO',
    totalParticipantes: '27',
    pathImagen: 'assets/imagenes/opciones-menu-inicio/opcion-jugar.jpeg'
  },
];

export const DATOS_VALORES_ACCIONES_AUSPICIANTES = {
  auspiciantes: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  valorAccionAuspiciantes: [65, 59, 80, 81, 56, 55, 40],
};

export const PATH_IMAGEN = 'assets/imagenes/opciones-menu-inicio/opcion-jugar.png';
