import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuOpcionesAcademicoComponent } from 'src/app/componentes/menu-opciones-academico/menu-opciones-academico/menu-opciones-academico.component';
import { RutaGestionCarrerasComponent } from './rutas/ruta-gestion-carreras/ruta-gestion-carreras.component';
import { RutaGestionCursosComponent } from './rutas/ruta-gestion-cursos/ruta-gestion-cursos.component';
import { RutaGestionEstudiantesComponent } from './rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component';
import { RutaGestionProfesoresComponent } from './rutas/ruta-gestion-profesores/ruta-gestion-profesores.component';
import { RutaGestionArchivoComponent } from './rutas/ruta-gestion-archivo/ruta-gestion-archivo.component';
import { MenuOpcionesEstudianteComponent } from 'src/app/componentes/menu-opciones-estudiante/menu-opciones-estudiante/menu-opciones-estudiante.component';
import { RutaVerComprobantesComponent } from './rutas/ruta-ver-comprobantes/ruta-ver-comprobantes.component';
import { RutaVerHorariosComponent } from './rutas/ruta-ver-horarios/ruta-ver-horarios.component';
import { RutaVerCurriculumComponent } from './rutas/ruta-ver-curriculum/ruta-ver-curriculum.component';
import { RutaMatriculacionComponent } from './rutas/ruta-matriculacion/ruta-matriculacion.component';


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
        children: [
          {
            path: '',
            component: RutaGestionCarrerasComponent
          },
          {
            path: ':id/materias',
            component: RutaGestionCarrerasComponent
          }
        ]

      },
      {
        path: 'cursos',
        component: RutaGestionCursosComponent
      },
      {
        path: 'estudiantes',
        children: [
          {
            path: '',
            component: MenuOpcionesEstudianteComponent
          },
          {
            path: 'ver-comprobantes',
            component: RutaVerComprobantesComponent
          },
          {
            path: 'ver-horarios',
            component: RutaVerHorariosComponent
          },
          {
            path: 'ver-curriculum',
            component: RutaVerCurriculumComponent
          },
          {
            path: 'matriculacion',
            component: RutaMatriculacionComponent
          }

        ]
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
