import { Component, OnInit } from '@angular/core';
import {OPCIONES_MENU_ADMINISTRADOR} from '../../../constantes/opciones-menu-administrador';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-opciones-administrador',
  templateUrl: './menu-opciones-administrador.component.html',
  styleUrls: ['./menu-opciones-administrador.component.scss']
})
export class MenuOpcionesAdministradorComponent implements OnInit {

  opcionesMenuAdministrador = OPCIONES_MENU_ADMINISTRADOR;
  esEstudiante = false;
  esProfesor = false;
  esAdmin = false;
  constructor(
        private readonly _router: Router,
        private readonly _activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
      this._activatedRoute
      .queryParams
      .subscribe(
        params => {
          if(params.rol === 'estudiante'){
            this.esEstudiante = true;
          }else {
            if(params.rol === 'administrador'){
            this.esAdmin = true;
            }else{
              if(params.rol === 'profesor'){
            this.esAdmin = true;
            }
            }
            }
          console.log('queryParams', params);
        }
      );
  }

}
