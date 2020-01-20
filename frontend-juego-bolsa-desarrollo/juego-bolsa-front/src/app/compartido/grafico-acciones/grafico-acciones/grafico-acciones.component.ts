import {Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-grafico-acciones',
  templateUrl: './grafico-acciones.component.html',
  styleUrls: ['./grafico-acciones.component.scss']
})
export class GraficoAccionesComponent implements OnInit {
  @Input() informacionGrafico: any;
  opciones = {};
  constructor() {
  }

  ngOnInit() {
    this.opciones = {
      plugins: {
        datalabels: {
          align: 'end',
          anchor: 'end',
          borderRadius: 4,
          backgroundColor: '#081971',
          color: 'white',
          font: {
            weight: 'bold',
            size: 10
          },
        }
      }
    };
  }
}
