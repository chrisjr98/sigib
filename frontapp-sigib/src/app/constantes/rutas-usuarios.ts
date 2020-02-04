export const RUTAS_CONFIGURACIONES = [
  {
    path: 'configuraciones',
    loadChildren: () => import('../modulos/configuraciones/configuraciones.module').then(mod => mod.ConfiguracionesModule),
  }
];
