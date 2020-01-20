import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MASK_NUMEROS_ENTEROS} from '../../../constantes/mascaras';
import {RentaFijaRonda} from '../interfaces/renta-fija-ronda';

@Component({
  selector: 'app-comprar-acciones-reta-fija',
  templateUrl: './comprar-acciones-reta-fija.component.html',
  styleUrls: ['./comprar-acciones-reta-fija.component.scss']
})
export class ComprarAccionesRetaFijaComponent implements OnInit {

  @Input()
  emisoresRentaFijaEnRonda: RentaFijaRonda[];

  @Output()
  emitirCantidades: EventEmitter<RentaFijaRonda[]> = new EventEmitter();
  mascaraNumeroEntero = MASK_NUMEROS_ENTEROS;

  constructor() {
  }

  ngOnInit() {
  }

  emitirAccionesREntaFijaCantidades(event) {
    this.emitirCantidades.emit(event);
  }
}
