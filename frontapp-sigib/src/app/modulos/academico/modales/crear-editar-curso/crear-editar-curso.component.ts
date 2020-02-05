import { Component, OnInit, Inject } from '@angular/core';
import { CursoInterface } from 'src/app/interfaces/interfaces/curso.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { UsuarioRestService } from 'src/app/servicios/rest/servicios/usuario-rest.service';
import { ToasterService } from 'angular2-toaster';
import { ESTADOS } from 'src/app/constantes/estados';

@Component({
  selector: 'app-crear-editar-curso',
  templateUrl: './crear-editar-curso.component.html',
  styleUrls: ['./crear-editar-curso.component.scss']
})
export class CrearEditarCursoComponent implements OnInit {

  crearEditarCurso: CursoInterface;
  formularioValido;
  usuario: CursoInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {usuario: CursoInterface},
    public dialogo: MatDialogRef<RutaGestionCursoComponent>,
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
      this.crearEditarCurso = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
  }

}
