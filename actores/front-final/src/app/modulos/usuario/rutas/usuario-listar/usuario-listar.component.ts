import { Component, OnInit } from '@angular/core';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../../../servicios/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { LIMITE_PAGINACION } from '../../../../constantes/paginacion';

@Component({
  selector: 'app-usuario-listar',
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.css']
})
export class UsuarioListarComponent implements OnInit {


  usuarios: UsuarioInterface[] = [];

  patron = '';

  totalUsuarios: number;

  elementoResaltado: number;

  emptyMessage = 'No hay usuarios para mostrar :(';

  filas = LIMITE_PAGINACION;

  constructor(private readonly _usuarioService: UsuarioService,
              private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerResaltadoYProductoras();
  }


  buscar(skip: number) {
    this._usuarioService.contarBuscados(this.patron)
    .subscribe((resultado: any) => {
      this.totalUsuarios = resultado;
    }, (error) => {
      console.log('error cargando usuarios', error);
    });

    this._usuarioService.buscarUsuarios(this.patron, skip, this.filas).subscribe((usuarios: any) => {
      this.usuarios = usuarios;
    }, (error) => {
      console.log('error buscando usuarios', error);
    });
  }

  obtenerResaltadoYProductoras() {
    const $obtenerParametros = this._activatedRoute.paramMap;
    $obtenerParametros.subscribe((parametros) => {
      this.elementoResaltado = +parametros.get('resaltado');
      this.buscar(0);
    });
  }

  loadData(event) {
    this.buscar(event.first);
  }

}
