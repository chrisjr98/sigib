import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastCrear, toastErrorCrear } from '../../../../shared/toaster';

@Component({
  selector: 'app-usuario-crear',
  templateUrl: './usuario-crear.component.html',
  styleUrls: ['./usuario-crear.component.css']
})
export class UsuarioCrearComponent implements OnInit {

  usuarioCrear: UsuarioInterface;

  crearDisable = true;

  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _router: Router,
              private  readonly _toastService: ToasterService) { }

  ngOnInit() {
  }

  crear() {
    this._usuarioService.crear(this.usuarioCrear).subscribe((resultado: any) => {
      console.log('se creo exitosamente', resultado);
      this._toastService.pop(toastCrear);
      this._router.navigate(['/aplicacion', 'usuario', 'listar', {resaltado: resultado.id}]);
    }, (error) => {
      console.log('error creando :(', error);
      this._toastService.pop(toastErrorCrear);
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'usuario', 'listar']);
  }

  formularioEsValido(usuario: UsuarioInterface) {
    if (usuario) {
      this.usuarioCrear = usuario;
      this.crearDisable = false;
    } else {
      this.crearDisable = true;
    }
  }
}
