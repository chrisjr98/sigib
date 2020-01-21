import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InicioComponent } from './rutas/inicio/inicio.component';
import { LoginComponent } from './rutas/login/login.component';
import { ReestablecerPasswordComponent } from './rutas/reestablecer-password/reestablecer-password.component';
import { AplicacionComponent } from './rutas/aplicacion/aplicacion.component';

const RUTAS: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'reset-password',
        component: ReestablecerPasswordComponent
    },
    {
        path: 'aplicacion',
        component: AplicacionComponent,
        children: [
            {
                path: 'inicio',
                component: InicioComponent
            },
            {
                path: 'productora',
                loadChildren: 'src/app/modulos/productora/productora.module#ProductoraModule',
            },
            {
                path: 'pelicula',
                loadChildren: 'src/app/modulos/pelicula/pelicula.module#PeliculaModule',
            },
            {
                path: 'actor',
                loadChildren: 'src/app/modulos/actor/actor.module#ActorModule',
            },
            {
                path: 'usuario',
                loadChildren: 'src/app/modulos/usuario/usuario.module#UsuarioModule',
            },
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'aplicacion/inicio',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            RUTAS,
            {useHash: true}
        )
    ],
    exports: [RouterModule]
})
export class RutasAppModule { }
