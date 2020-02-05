import { Component, OnInit } from "@angular/core";
import { OPCIONES_MENU_ACADEMICO_ADMINISTRADOR } from "../../../constantes/opciones-menu-academico-administrador";

@Component({
  selector: "app-menu-academico-administrador",
  templateUrl: "./menu-academico-administrador.component.html",
  styleUrls: ["./menu-academico-administrador.component.scss"]
})
export class MenuAcademicoAdministradorComponent implements OnInit {

  opcionesMenuAcademicoAdministrador = OPCIONES_MENU_ACADEMICO_ADMINISTRADOR;

  constructor() {}

  ngOnInit() {}
}
