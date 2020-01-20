export const RUTAS_JUGADOR = [
  {
    path: 'jugador',
    loadChildren: () => import('../modulos/jugador/jugador.module').then(mod => mod.JugadorModule),
    data: { tipoUsuario: 'jugador' }
  }
];
