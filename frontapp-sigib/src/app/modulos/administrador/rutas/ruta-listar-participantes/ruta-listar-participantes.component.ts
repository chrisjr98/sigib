import {Component, OnInit} from '@angular/core';
import {ParticipanteJuegoRestService} from '../../../../servicios/rest/servicios/participante-juego-rest.service';
import {ActivatedRoute} from '@angular/router';
import {SocketJuegoService} from '../../../../servicios/rest/servicios/socket-juego-rest.service';
import {JuegoRestService} from '../../../../servicios/rest/servicios/juego-rest.service';

@Component({
  selector: 'app-ruta-listar-participantes',
  templateUrl: './ruta-listar-participantes.component.html',
  styleUrls: ['./ruta-listar-participantes.component.scss']
})

export class RutaListarParticipantesComponent implements OnInit {
  idJuego: number;
  arregloParticipantes = [];
  mostrarLista = true;


  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _participanteJuegoRestService: ParticipanteJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this._activatedRoute
      .paramMap
      .subscribe(
        r => {
          this.idJuego = +r.get('idJuego');
          this.listarJugadoresPartida(this.idJuego);
          this.obtenerJuego(this.idJuego)
            .subscribe((juego) => {
                this._socketJuegoService
                  .unirseJuego(juego)
                  .then(() => {
                  });
              },
              error => {
                console.error(error);
              }
            );
        }
      );
    this._socketJuegoService
      .eventoParticipanteAgregado
      .subscribe(
        datos => {
          if (datos.participante) {
            this.arregloParticipantes.unshift(datos.participante);
            this.mostrarLista = false;
            setTimeout(
              () => {
                this.mostrarLista = true;
              },
              1
            );
          }
        }, error => {
          console.error(error);
        });
  }

  obtenerJuego(idJuego: number) {
    return this._juegoRestService
      .findOne(idJuego);
  }

  listarJugadoresPartida(idJuego) {
    const consulta = {
      relations: ['participante', 'juego'],
      where: {
        juego: idJuego,
      }
    };
    this._participanteJuegoRestService
      .findAll(JSON.stringify(consulta))
      .subscribe(
        r => {
          this.arregloParticipantes = r[0]
            .map(
              // tslint:disable-next-line:no-shadowed-variable
              r => {
                return r.participante;
              });
        }, error => {
          console.error(error);
        }
      );
  }

}
