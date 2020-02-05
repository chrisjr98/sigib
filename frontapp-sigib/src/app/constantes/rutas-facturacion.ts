export const RUTAS_FACTURACION = [
  {
    path: 'facturacion',
    loadChildren: () => import('../modulos/configuraciones/configuraciones.module').then(mod => mod.ConfiguracionesModule),
  }
];
