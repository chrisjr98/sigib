import {Component, Inject, OnInit} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {ParticipanteJuegoRestService} from '../../../servicios/rest/servicios/participante-juego-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JugadaParticipanteInterface} from '../../../interfaces/interfaces/jugada-participante.interface';
import {JugadaParticipanteRestService} from '../../../servicios/rest/servicios/jugada-participante-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../constantes/numero-filas-tablas';
import {QueryParamsInterface} from '../../../interfaces/interfaces/query-params.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-tabla-jugadas',
  templateUrl: './tabla-jugadas.component.html',
  styleUrls: ['./tabla-jugadas.component.scss']
})
export class TablaJugadasComponent implements OnInit {
  jugadasJugador: JugadaParticipanteInterface[];
  columnas = [
    {field: 'ronda', header: 'Ronda', width: '10%'},
    {field: 'dineroEmpieza', header: 'Dinero Inicial Juego', width: '10%'},
    {field: 'emisor', header: 'Emisor', width: '10%'},
    {field: 'tipo', header: 'Tipo Acción', width: '10%'},
    {field: 'precio', header: 'Precio Actual', width: '10%'},
    {field: 'cantidad', header: 'Cant.', width: '10%'},
    {field: 'dineroActual', header: 'Saldo Final Ronda', width: '10%'},
    {field: 'accionesParticipante', header: 'Saldo Portafolio Actual', width: '10%'},
    {field: 'estado', header: 'Estado', width: '10%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  dineroActual: number;
  constructor(
    public dialogo: MatDialogRef<TablaJugadasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {idJuego: number, idParticipante: number, nombre: string},
    // tslint:disable-next-line:variable-name
    private  readonly _jugadaParticipanteService: JugadaParticipanteRestService,
    // tslint:disable-next-line:variable-name
    private readonly _participanteJuego: ParticipanteJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.inicializarJugadas();
  }
  inicializarJugadas() {
    const consultaJugadas = {
      idParticipante: this.data.idParticipante,
      idJuego: this.data.idJuego,
    };
    this._participanteJuego.findAll(JSON.stringify({ where: {
        participante: this.data.idParticipante,
        juego: this.data.idJuego,
      }
    })).subscribe(
      participante => {
        this.dineroActual = participante[0][0].dineroActual;
      }
    );
    this._jugadaParticipanteService.obtenerJugadasCalculadasJugador(consultaJugadas)
      .subscribe( respuesta => {
        this.jugadasJugador = respuesta;
        this.jugadasJugador.map(jugada => {
          if (jugada.tipoAccion.tipo === 'C') {
            jugada.tipo = 'Compra Acciones';
          } else if (jugada.tipoAccion.tipo === 'V') {
            jugada.tipo = 'Venta Acciones';
          } else {
            jugada.tipo = 'Compra Papeles Renta';
          }
          return jugada;
        });
      }, error => {
        console.error(error);
        this._toasterService.pop('error', 'Error', 'Error al cargar las jugadas del participante');
      });
  }
}
