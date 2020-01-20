import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-accion-jugador',
  templateUrl: './accion-jugador.component.html',
  styleUrls: ['./accion-jugador.component.scss']
})
export class AccionJugadorComponent implements OnInit {

  @Input()
  jugador: string;

  @Input()
  cantidad: number;

  @Input()
  tipoAccion: number;

  @Input()
  emisor: string;

  constructor() {
  }

  ngOnInit() {
  }

}
