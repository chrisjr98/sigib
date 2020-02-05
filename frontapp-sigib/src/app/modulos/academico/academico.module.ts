import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicoRoutingModule } from './academico-routing.module';
import { RutaGestionCarrerasComponent } from './rutas/ruta-gestion-carreras/ruta-gestion-carreras.component';
import { RutaGestionCursosComponent } from './rutas/ruta-gestion-cursos/ruta-gestion-cursos.component';
import { RutaGestionEstudiantesComponent } from './rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component';
import { RutaGestionProfesoresComponent } from './rutas/ruta-gestion-profesores/ruta-gestion-profesores.component';
import { RutaGestionArchivoComponent } from './rutas/ruta-gestion-archivo/ruta-gestion-archivo.component';
import { MenuOpcionesAcademicoModule } from 'src/app/componentes/menu-opciones-academico/menu-opciones-academico.module';


@NgModule({
  declarations: [RutaGestionCarrerasComponent,
    RutaGestionCursosComponent,
    RutaGestionEstudiantesComponent,
    RutaGestionProfesoresComponent,
    RutaGestionArchivoComponent],
  imports: [
    CommonModule,
    AcademicoRoutingModule,
    MenuOpcionesAcademicoModule

  ]
})
export class AcademicoModule { }
