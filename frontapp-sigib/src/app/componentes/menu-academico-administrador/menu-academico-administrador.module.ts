import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuAcademicoAdministradorComponent } from "./menu-academico-administrador/menu-academico-administrador.component";
import { OpcionMenuModule } from "../../compartido/opcion-menu/opcion-menu.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [MenuAcademicoAdministradorComponent],
  exports: [MenuAcademicoAdministradorComponent],
  imports: [CommonModule, OpcionMenuModule, RouterModule]
})

export class MenuAcademicoAdministradorModule {}
