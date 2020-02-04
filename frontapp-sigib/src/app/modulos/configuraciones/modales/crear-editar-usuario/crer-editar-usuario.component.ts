import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {RutaGestionUsuariosComponent} from '../../rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import {UsuarioInterface} from '../../../../interfaces/interfaces/usuario.interface';
import {ESTADOS} from '../../../../constantes/estados';
import { Usuario } from "../../../../clases/usuario";
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
@Component({
  selector: 'app-crer-editar-usuario',
  templateUrl: './crer-editar-usuario.component.html',
  styleUrls: ['./crer-editar-usuario.component.scss']
})
export class CrearEditarUsuarioComponent implements OnInit {
  crearEditarUsuario: UsuarioInterface;
  formularioValido;
  usuario: UsuarioInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {usuario: UsuarioInterface},
    public dialogo: MatDialogRef<RutaGestionUsuariosComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _usuarioService: UsuarioRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(usuario) {
    if (usuario) {
      this.crearEditarUsuario = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.usuario) {
      this._usuarioService
        .updateOne(this.data.usuario.id, this.crearEditarUsuario)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            this.crearEditarUsuario.habilitado = this.data.usuario.habilitado;
            this.dialogo.close(this.crearEditarUsuario);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    } else {
      this._usuarioService
        .create(this.usuario)
        .subscribe(
          r => {
            r.habilitado = r.habilitado ? ESTADOS.Activo : ESTADOS.Inactivo;
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    }
  }

}
