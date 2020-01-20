import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

declare var user_id;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  estaLogeado: boolean;
  urlSalir = `${environment.url}:${environment.port}/logout`;


  constructor(
    // tslint:disable-next-line:variable-name
    public readonly router: Router,
  ) {
    this.estaLogeado = false;
  }

  ngOnInit() {
  }

  salir() {
    window.location.href = this.urlSalir;
  }

}
