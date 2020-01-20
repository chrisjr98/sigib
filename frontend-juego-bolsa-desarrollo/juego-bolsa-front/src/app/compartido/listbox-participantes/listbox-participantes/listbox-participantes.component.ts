import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-listbox-participantes',
  templateUrl: './listbox-participantes.component.html',
  styleUrls: ['./listbox-participantes.component.scss']
})
export class ListboxParticipantesComponent implements OnInit {

  @Input()
  arregloJugadores: { label: string, value: number }[];

  @Output()
  opcionSeleccionada: EventEmitter<number> = new EventEmitter();

  @Output()
  nombreJugadorSeleccionado: EventEmitter<string> = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }

  jugadorSeleccionado(evento) {
    this.nombreJugadorSeleccionado.emit(this.arregloJugadores.find(j => j.value === evento.value).label);
    this.opcionSeleccionada.emit(evento.value);
  }


}
