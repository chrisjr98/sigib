import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-resultados',
  templateUrl: './mostrar-resultados.component.html',
  styleUrls: ['./mostrar-resultados.component.scss']
})
export class MostrarResultadosComponent implements OnInit {
  resultados = [];
  constructor() { }

  ngOnInit() {
    this.resultados = [
      {numeroPuesto: 1, dineroGanado: 2010, participante: 'Audi'},
      {numeroPuesto: 2, dineroGanado: 2015, participante: 'BMW'},
      {numeroPuesto: 3, dineroGanado: 2012, participante: 'Honda'},
      {numeroPuesto: 4, dineroGanado: 1998, participante: 'Renault'},
      {numeroPuesto: 5, dineroGanado: 2011, participante: 'VW'},
      {numeroPuesto: 6, dineroGanado: 2015, participante: 'Jaguar'},
      {numeroPuesto: 7, dineroGanado: 2012, participante: 'Ford'},
      {numeroPuesto: 8, dineroGanado: 2011, participante: 'Mercedes'},
      {numeroPuesto: 9, dineroGanado: 2015, participante: 'Ford'}
    ];
  }

}
