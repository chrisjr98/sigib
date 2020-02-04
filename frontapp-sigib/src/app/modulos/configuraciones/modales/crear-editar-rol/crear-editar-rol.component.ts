import { Component, OnInit, Inject } from '@angular/core';
import { RolInterface } from 'src/app/interfaces/interfaces/role.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { RutaGestionRolesComponent } from '../../rutas/ruta-gestion-roles/ruta-gestion-roles.component';

@Component({
  selector: 'app-crear-editar-rol',
  templateUrl: './crear-editar-rol.component.html',
  styleUrls: ['./crear-editar-rol.component.scss']
})
export class CrearEditarRolComponent implements OnInit {

  crearEditarRol: RolInterface;
  formularioValido;
  rol: RolInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {rol: RolInterface},
    public dialogo: MatDialogRef<RutaGestionRolesComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(usuario) {
    if (usuario) {
      this.crearEditarRol = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {

  }

}
