import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaMenuAcademicoAdministradorComponent } from './rutas/ruta-menu-academico-administrador/ruta-menu-academico-administrador.component';
import { MenuAcademicoAdministradorModule } from 'src/app/componentes/menu-academico-administrador/menu-academico-administrador.module';



@NgModule({
  declarations: [
    RutaMenuAcademicoAdministradorComponent
  ],
  imports: [
    CommonModule,
    MenuAcademicoAdministradorModule
  ]
})
export class AcademicoModule { }
