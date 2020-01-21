import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  usuario: UsuarioInterface;

  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idUsuario = parametrosRuta.get('id');
      this._usuarioService.obtenerUno(+idUsuario).subscribe((resultado: any) => {
        this.usuario = resultado;
        console.log(this.usuario);
      }, (error) => {
        console.error('error obteniendo usuario', error);
      });
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'usuario', 'listar', {resaltado: this.usuario.id}]);
  }


}
