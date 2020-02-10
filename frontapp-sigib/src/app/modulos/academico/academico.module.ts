import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicoRoutingModule } from './academico-routing.module';
import { RutaGestionCarrerasComponent } from './rutas/ruta-gestion-carreras/ruta-gestion-carreras.component';
import { RutaGestionCursosComponent } from './rutas/ruta-gestion-cursos/ruta-gestion-cursos.component';
import { RutaGestionEstudiantesComponent } from './rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component';
import { RutaGestionProfesoresComponent } from './rutas/ruta-gestion-profesores/ruta-gestion-profesores.component';
import { RutaGestionArchivoComponent } from './rutas/ruta-gestion-archivo/ruta-gestion-archivo.component';
import { MenuOpcionesAcademicoModule } from 'src/app/componentes/menu-opciones-academico/menu-opciones-academico.module';
import { FormularioCarreraComponent } from './formularios/formulario-carrera/formulario-carrera.component';
import { CrearEditarCarreraComponent } from './modales/crear-editar-carrera/crear-editar-carrera.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule, MatButtonModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SelectGeneralModule } from 'src/app/compartido/select-general/select-general.module';
import { PickListModule } from 'primeng/picklist';
import { SeleccionarMateriasComponent } from './componentes/seleccionar-materias/seleccionar-materias.component';
import { RutaVerComprobantesComponent } from './rutas/ruta-ver-comprobantes/ruta-ver-comprobantes.component';
import { RutaVerHorariosComponent } from './rutas/ruta-ver-horarios/ruta-ver-horarios.component';
import { RutaVerCurriculumComponent } from './rutas/ruta-ver-curriculum/ruta-ver-curriculum.component';
import { RutaMatriculacionComponent } from './rutas/ruta-matriculacion/ruta-matriculacion.component';
import { MenuOpcionesEstudianteModule } from 'src/app/componentes/menu-opciones-estudiante/menu-opciones-estudiante.module';


@NgModule({
  declarations: [RutaGestionCarrerasComponent,
    RutaGestionCursosComponent,
    RutaGestionEstudiantesComponent,
    RutaGestionProfesoresComponent,
    RutaGestionArchivoComponent,
    FormularioCarreraComponent,
    CrearEditarCarreraComponent,
    SeleccionarMateriasComponent,
    RutaVerComprobantesComponent,
    RutaVerHorariosComponent,
    RutaVerCurriculumComponent,
    RutaMatriculacionComponent],
  imports: [
    CommonModule,
    AcademicoRoutingModule,
    MenuOpcionesAcademicoModule,
    MenuOpcionesEstudianteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    DropdownModule,
    MatDialogModule,
    TableModule,
    MatSelectModule,
    SelectGeneralModule,
    MatOptionModule,
    PickListModule,
    MatButtonModule,

  ],
entryComponents: [
CrearEditarCarreraComponent
]
})
export class AcademicoModule { }
