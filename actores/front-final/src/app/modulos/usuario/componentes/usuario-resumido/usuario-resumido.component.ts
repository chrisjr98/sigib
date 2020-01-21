import { Component, OnInit, Input } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { ToasterService } from 'angular2-toaster';
import { toastEditar, toastErrorEditar } from 'src/app/shared/toaster';

@Component({
  selector: 'app-usuario-resumido',
  templateUrl: './usuario-resumido.component.html',
  styleUrls: ['./usuario-resumido.component.css']
})
export class UsuarioResumidoComponent implements OnInit {

  @Input() usuario: UsuarioInterface;

  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _toastService: ToasterService) { }

  ngOnInit() {
  }

  activarDesactivar(id: number) {
    this._usuarioService.activarDesactivar(+id)
    .subscribe((resultado: any) => {
      console.log('r', resultado);
      this.usuario.activo = resultado;
      this._toastService.pop(toastEditar);
    },
    (error) => {
      console.log(error);
      this._toastService.pop(toastErrorEditar);
    });
  }

}
