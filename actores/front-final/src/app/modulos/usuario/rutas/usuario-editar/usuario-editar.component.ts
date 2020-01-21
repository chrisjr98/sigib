import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastEditar, toastErrorEditar, toastFoto, toastWarningFoto } from 'src/app/shared/toaster';
import { validacionObligatoria } from 'src/app/shared/validaciones';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioInterface } from 'src/app/modulos/usuario/interfaces/usuario.interface';
import { MatDialog } from '@angular/material';
import { SubirArchivoComponent } from 'src/app/modulos/material/subir-archivo/subir-archivo.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {
  usuarioEditar: UsuarioInterface;

  botonEditarDisable = true;

  usuario: UsuarioInterface;

  formularioImagen: FormGroup;

  mensajesErrorId: string[];

  mensajesErrorFile: string[];

  enableCambiarImg = false;

  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _toastService: ToasterService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idUsuario = parametrosRuta.get('id');
      this._usuarioService.obtenerUno(+idUsuario).subscribe((productoraResultado: any) => {
        this.usuario = productoraResultado;
      }, (error) => {
        console.error('error obteniendo usuario', error);
      });
    });
  }

  editar() {
    this._usuarioService.editar(+this.usuario.id, this.usuarioEditar)
      .subscribe((resultado) => {
        console.log(this.usuario.id);
        console.log('se creo exitosamente', resultado);
        this._toastService.pop(toastEditar);
        this._router.navigate(['/aplicacion', 'usuario', 'listar', {resaltado: this.usuario.id}]);
      }, (error) => {
        console.log('error creando :(', error);
        this._toastService.pop(toastErrorEditar);
      });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'usuario', 'listar', {resaltado: this.usuario.id}]);
  }

  formularioEsValido(usuario: UsuarioInterface) {

    const seEdito = ((usuario.direccion !== this.usuario.direccion) ||
                    (usuario.nick !== this.usuario.nick) ||
                    (usuario.rol !== this.usuario.rol)) &&
                    usuario;
    if (seEdito) {
      this.botonEditarDisable = false;
      this.usuarioEditar = usuario;
    } else {
      this.botonEditarDisable = true;
    }
  }


  abrirDialogoArchivo() {
    const dialogRef = this.dialog.open(SubirArchivoComponent, {
      width: '450px',
      height: '250px',
      data: {
        url: environment.urlBackEnd + '/usuario/subirFoto?id=' + this.usuario.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.editado) {
        this._toastService.pop(toastFoto);
      } else {
        this._toastService.pop(toastWarningFoto);
      }
    });
  }
}
