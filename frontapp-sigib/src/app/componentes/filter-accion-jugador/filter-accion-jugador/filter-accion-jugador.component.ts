import { Component, OnInit } from '@angular/core';
import { ParticipanteJuegoRestService } from '../../../servicios/rest/servicios/participante-juego-rest.service';
import { ActivatedRoute } from '@angular/router';
import { JugadaParticipanteInterface } from '../../../interfaces/interfaces/jugada-participante.interface';
import { JuegoRestService } from '../../../servicios/rest/servicios/juego-rest.service';

@Component({
  selector: 'app-filter-accion-jugador',
  templateUrl: './filter-accion-jugador.component.html',
  styleUrls: ['./filter-accion-jugador.component.scss']
})
export class FilterAccionJugadorComponent implements OnInit {
  idJuego: number;
  ronda: number;
  numeroRonda: number;
  rondas = [];
  accionesJugador = [];
  busqueda: string;

  columnas = [
    { field: 'participante', header: 'Participante' },
    { field: 'tipoAccion', header: 'Accion' },
    { field: 'emisor', header: 'Emisor' },
    { field: 'cantidad', header: 'Cantidad' },
    { field: 'ronda', header: '# Ronda' }
  ];

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _participanteJuegoRestService: ParticipanteJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.idJuego = +params.idJuego;
    });
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.ronda = +queryParams.ronda;
      this.obtenerParticipantes();
      this.obtenerJuego();
    });
  }

  obtenerParticipantes(nombre?, ronda?) {
    const consultaParticipantes = {
      idJuego: this.idJuego,
      ronda: ronda ? ronda : this.ronda,
      nombre: nombre ? nombre : ''
    };
    this._participanteJuegoRestService
      .obtenerParticipantesJugadasPorIdJuego(consultaParticipantes)
      .subscribe((participantes: JugadaParticipanteInterface[]) => {
        this.rondas.push({ ronda: this.ronda });
        this.accionesJugador = participantes
          .filter(res => {
            return res.ronda !== null;
          })
          .map(registro => {
            return {
              cantidad: registro.cantidad,
              emisor: registro.emisor,
              participante: registro.participante,
              tipoAccion: +registro.tipoAccion.id,
              ronda: registro.ronda.numeroRonda
            };
          }) as any;
      });
  }

  buscarParticipante(evento) {
    const busqueda = evento.trim();
    this.busqueda = busqueda;
    this.obtenerParticipantes(this.busqueda);
  }

  rondaSeleccionada(evento) {
    const numeroRonda = evento.value.ronda;
    if (numeroRonda) {
      this.obtenerParticipantes(this.busqueda, +numeroRonda);
    } else {
      this.obtenerParticipantes(this.busqueda);
    }
  }

  obtenerJuego() {
    this._juegoRestService.findOne(this.idJuego).subscribe(
      r => {
        // @ts-ignore
        for (
          let numeroRonda = 1;
          numeroRonda <= r.numeroRondas;
          numeroRonda++
        ) {
          this.rondas.push({ ronda: numeroRonda });
        }
      },
      error => {
        console.error({
          error,
          mensaje: 'Error buscar juego'
        });
      }
    );
  }
}
