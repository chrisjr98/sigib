import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuOpcionesAcademicoComponent } from 'src/app/componentes/menu-opciones-academico/menu-opciones-academico/menu-opciones-academico.component';
import { RutaGestionCarrerasComponent } from './rutas/ruta-gestion-carreras/ruta-gestion-carreras.component';
import { RutaGestionCursosComponent } from './rutas/ruta-gestion-cursos/ruta-gestion-cursos.component';
import { RutaGestionEstudiantesComponent } from './rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component';
import { RutaGestionProfesoresComponent } from './rutas/ruta-gestion-profesores/ruta-gestion-profesores.component';
import { RutaGestionArchivoComponent } from './rutas/ruta-gestion-archivo/ruta-gestion-archivo.component';


const routes: Routes = [
  {
    path: 'menu-academico',
    children: [
      {
        path: '',
        component: MenuOpcionesAcademicoComponent,
      },
      {
        path: 'carreras',
        component:RutaGestionCarrerasComponent
      },
      {
        path: 'cursos',
        component: RutaGestionCursosComponent
      },
      {
        path: 'estudiantes',
        component: RutaGestionEstudiantesComponent
      },
      {
        path: 'profesores',
        component: RutaGestionProfesoresComponent
      },
            {
        path: 'archivo',
        component: RutaGestionArchivoComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu-academico',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicoRoutingModule { }
