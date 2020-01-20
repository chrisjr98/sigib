import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { JuegoRestService } from '../../../servicios/rest/servicios/juego-rest.service';
import { JuegoInterface } from '../../../interfaces/interfaces/juego.interface';
import { SocketJuegoService } from '../../../servicios/rest/servicios/socket-juego-rest.service';
import { RondaRestService } from '../../../servicios/rest/servicios/ronda-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RentaFijaRondaRestService } from '../../../servicios/rest/servicios/renta-fija-ronda-rest.service';
import { EmisorJuegoRestService } from '../../../servicios/rest/servicios/emisor-juego-rest.service';
import { EmisorJuegoInterface } from '../../../interfaces/interfaces/emisor-juego.interface';
import { EmisorInterface } from '../../../interfaces/interfaces/emisor.interface';
import { MatDialog } from '@angular/material';
import { RegistrarJugadasComponent } from '../../../modales/registrar-jugadas/registrar-jugadas/registrar-jugadas.component';
import { NivelJuegoInterface } from '../../../interfaces/interfaces/nivel-juego.interface';
import { NoticiasRondaRestService } from '../../../servicios/rest/servicios/noticias-ronda-rest.service';
import { ToasterService } from 'angular2-toaster';
import { eliminarElementosRepetidosArreglo } from '../../../funciones/eliminar-elementos-repetidos-arreglo';
import { NoticiaCardInterface } from '../../../interfaces/interfaces/noticia-card.interface';
import { NoticiaEmisorRestService } from '../../../servicios/rest/servicios/noticia-emisor-rest.service';
import { mergeMap } from 'rxjs/operators';
import { OpcionesRondaComponent } from '../../../modales/opciones-ronda/opciones-ronda/opciones-ronda.component';
import { CargandoService } from '../../../servicios/cargando-service/cargando-service';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
import { environment } from '../../../../environments/environment';
import { LocalStorageService } from '../../../servicios/rest/servicios/local-storage.service';
import { TablaJugadasComponent } from '../../tabla-jugadas/tabla-jugadas/tabla-jugadas.component';
import { RankingJugadoresComponent } from '../../ranking-jugadores/ranking-jugadores/ranking-jugadores.component';
import { ModalMostrarNoticiaComponent } from '../../../modales/modal-mostrar-noticia/modal-mostrar-noticia/modal-mostrar-noticia.component';
import { Subscription } from 'rxjs';
import { EmpezarRondaInterface } from '../../../interfaces/interfaces/empezar-ronda.interface';
import { RentaFijaRondaInterface } from '../../../interfaces/interfaces/renta-fija-ronda.interface';
import { TipoNoticias } from '../../../enums/tipo-noticias';
import { ModalConfirmacionComponent } from '../../../componentes/confirmacion/modal/modal-confirmacion/modal-confirmacion.component';

@Component({
  selector: 'app-juego-administrador-jugador',
  templateUrl: './juego-administrador-jugador.component.html',
  styleUrls: ['./juego-administrador-jugador.component.scss']
})
export class JuegoAdministradorJugadorComponent implements OnInit, OnDestroy {
  @Input() esAdministrador: boolean;
  @Input() idJuego: number;
  @Input() mostarOcultarNoticia?: boolean;
  @ViewChild('countdown', { static: false })
  private cuentaRegresiva: CountdownComponent;
  pathLogo =
    environment.url +
    ':' +
    environment.port +
    '/' +
    environment.pathLogosEmisores +
    '/';
  rondas: number;
  tiempo: number;
  tiempoRonda: number;
  juego: JuegoInterface;
  verNoticias = false;
  precio: number[] = [];
  acciones: number[] = [];
  nombreEmisores = [];
  arregloRF = [];
  rentaFijaEmisor = [];
  rondaActual = 0;
  rondaAnterior = -1;
  totalRondas = 0;
  emisoresJuego: EmisorJuegoInterface[];
  emisores: EmisorInterface[];
  idRondaJuego: number;
  idRondaAcrtual: number;
  noticias: NoticiaCardInterface[];
  idEmisoresPositivos: Array<{idEmisor: number, valorAfecta: number}> = [];
  idEmisoresNegativos: Array<{idEmisor: number, valorAfecta: number}> = [];
  // valorAfectaEmisorPositivo: number;
  // valorAfectaEnisorNegativo: number;
  informacionGrafico: any;
  inhabilitarBotonMostrarNoticias;
  inhabilitarBotonOpcionesRonda;
  inhabilitarBotonEmpezarRonda;
  inhabilitarBotonCaja;
  inhabilitarBotonRealizarJugada = true;
  verAyuda = false;
  rakingJugadores = [];
  estadoRonda: boolean;
  comproRentaVariable = false;
  mostrarFiltroJugadores = true;
  subscripcionEventoFinalizarRonda: Subscription;
  suscripciones: Subscription[] = [];
  inhabilitarBotonRegistrarJugada = true;
  mostrarToasterAyudaOk;
  audioFinalizarRonda = new Audio();
  tiempoComenzarAudio: number;
  constructor(
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _rondaRestService: RondaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaRondaRestService: RentaFijaRondaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _emisorJuegoRestService: EmisorJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _noticiaRondaRestService: NoticiasRondaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _noticiaEmisorRestService: NoticiaEmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _localStorageService: LocalStorageService,
    public matDialog: MatDialog
  ) {}

  ngOnInit() {
    this._activatedRoute.paramMap
      .pipe(
        mergeMap(params => {
          this.idJuego = +params.get('idJuego');
          return this._activatedRoute.queryParams;
        })
      )
      .subscribe(queryParams => {
        this.rondaActual = queryParams.ronda;
        this.idRondaJuego = queryParams.idRonda;
        if (this.esAdministrador) {
          this.inhabilitarBotonCaja = JSON.parse(queryParams.caja);
          this.inhabilitarBotonEmpezarRonda = JSON.parse(
            queryParams.empezarRonda
          );
        }
        this.inhabilitarBotonMostrarNoticias = !this.idRondaJuego;
        this.inhabilitarBotonOpcionesRonda = !this.idRondaJuego;
        const datosObtenerNoticiasRonda = {
          idRonda: +this.idRondaJuego
        };
        this._noticiaRondaRestService
          .obtenerNoticiasRonda(datosObtenerNoticiasRonda)
          .subscribe(
            noticiasRonda => {
              this.mostarOcultarNoticia = true;
              if (noticiasRonda) {
                this.inhabilitarBotonMostrarNoticias = true;
                this.inhabilitarBotonOpcionesRonda = true;
                const empezoRonda = JSON.parse(queryParams.empezarRonda);
                if (empezoRonda) {
                  this.cargarNoticiasYValoresAEmisoresAComponentes(
                    noticiasRonda
                  );
                } else {
                  this.setearValoresEmisores(noticiasRonda, noticiasRonda.tipo);
                }
              }
            },
            error => {
              this._toasterService.pop(
                'error',
                'Error',
                'Error al traer las noticias por ronda'
              );
              this._cargandoService.deshabilitarCargando();
              console.error(error);
            }
          );
        this.obtenerJuegoPorId();
        this.habilitarBotonRegistrarJugada();
        if (this.rondaActual > 0) {
          this.arregloRF = [];
          this.consultarRentaFijaVigentes();
        }
      });

    this.verificarSiEstoyConectado();
    const eventoNoticias$ = this._socketJuegoService.eventoCambiosJuego.subscribe(
      respuestSocketCambioJuego => {
        this._cargandoService.habilitarCargando();
        this.abrirModalMostrarNoticias(respuestSocketCambioJuego.noticiasRonda);
        this._cargandoService.deshabilitarCargando();
      }
    );
    this.suscripciones.push(eventoNoticias$);
  }

  verificarSiEstoyConectado() {
    if (this._socketJuegoService.estaConectado) {
      this._iniciaConexionWebSockets();
    }
    this._socketJuegoService.eventoConectado.subscribe(() => {
      this._iniciaConexionWebSockets();
    });
    this._socketJuegoService.eventoDesconectado.subscribe(() => {});
  }

  _iniciaConexionWebSockets() {
    this.socketComenzarRondaNueva();
    this.socketsNoticias();
    this.socketsVisualizarRatings();
    this.socketMostrarAyuda();
    this.escucharEventoFinalizarRonda();
    this.escucharEventoComenzarContador();
  }

  socketMostrarAyuda() {
    const eventoAyuda$ = this._socketJuegoService.eventoAyuda.subscribe(r => {
      if (r.mostrarAyuda) {
        this._toasterService.pop(
          'success',
          'Ayuda habilitada',
          'Se habilito correctamente'
        );
      } else {
        this._toasterService.pop(
          'success',
          'Ayuda deshabilitada',
          'Se deshabilito correctamente'
        );
      }
      this.juego.mostrarAyuda = r.mostrarAyuda;
    });
    this.suscripciones.push(eventoAyuda$);
  }

  socketsNoticias() {
    const eventoCambiosJuego$ = this._socketJuegoService.eventoCambiosJuego.subscribe(
      r => {
        this._cargandoService.habilitarCargando();
        this.setearNoticias(r.noticiasRonda);
        this._cargandoService.deshabilitarCargando();
      }
    );
    this.suscripciones.push(eventoCambiosJuego$);
  }

  socketComenzarRondaNueva() {
    const eventoEmpezarRonda$ = this._socketJuegoService.eventoEmpezarRonda.subscribe(
      (objetoComenzarRonda: EmpezarRondaInterface) => {
        if (objetoComenzarRonda.empezarRonda) {
        }
        this.rondaActual = objetoComenzarRonda.ronda;
        this.limpiarNoticiasYValoresEmisor();
      }
    );
    this.suscripciones.push(eventoEmpezarRonda$);
  }

  socketsVisualizarRatings() {
    const eventoVisualizarRatings$ = this._socketJuegoService.eventoRecibirRakingParticipantes.subscribe(
      r => {
        this.rakingJugadores = r;
        this.terminarJuegoJugador(this.rakingJugadores);
      }
    );
    this.suscripciones.push(eventoVisualizarRatings$);
  }

  escucharEventoFinalizarRonda() {
    const eventoFinalizarRonda$ = this._socketJuegoService.eventoFinalizarRonda.subscribe(
      r => {
        if (r.estadoRonda) {
          this.cuentaRegresiva.stop();
          this.limpiarNoticiasYValoresEmisor();
          const datosObtenerNoticiasRonda = {
            idRonda: +this.idRondaJuego
          };
          this._noticiaRondaRestService
            .obtenerNoticiasRonda(datosObtenerNoticiasRonda)
            .subscribe(
              noticiasRonda => {
                if (noticiasRonda) {
                  this.setearValoresEmisores(noticiasRonda, noticiasRonda.tipo);
                }
              },
              error => {
                this._toasterService.pop(
                  'error',
                  'Error',
                  'Error al traer las noticias por ronda'
                );
                this._cargandoService.deshabilitarCargando();
                console.error(error);
              }
            );
          this._toasterService.pop(
            'success',
            'Ronda finalizada',
            'La ronda a terminado correctamente'
          );
        }
      }
    );
    this.suscripciones.push(eventoFinalizarRonda$);
  }

  habilitarBotonRegistrarJugada() {
    this._rondaRestService.findOne(+this.idRondaJuego).subscribe(
      respuestaRonda => {
        this.inhabilitarBotonRegistrarJugada = respuestaRonda.estado === 'T';
      },
      error => {
        this._toasterService.pop('error', 'Error', 'Error al consultar ronda');
      }
    );
  }
  escucharEventoComenzarContador() {
    const eventoEmpezarContador$ = this._socketJuegoService.eventoEmpezarContador.subscribe(
      tiempoRonda => {
        this.cuentaRegresiva.restart();
        this.tiempoRonda = tiempoRonda.tiempoRonda;
        this.inhabilitarBotonRealizarJugada = false;
      }
    );
    this.suscripciones.push(eventoEmpezarContador$);
  }

  obtenerJuegoPorId() {
    const consulta = {
      relations: [
        'emisoresJuego',
        'emisoresJuego.emisor',
        'emisoresJuego.emisor.noticiasEmisor',
        'nivelJuego',
        'rondas',
        'nivelJuego.configuraciones'
      ],
      where: {
        id: this.idJuego
      }
    };
    this._juegoRestService.findAll(JSON.stringify(consulta)).subscribe(
      (juegos: [JuegoInterface[], number]) => {
        this.juego = juegos[0][0];
        this.verAyuda = !!juegos[0][0].mostrarAyuda;
        this.emisoresJuego = this.juego.emisoresJuego;
        this._socketJuegoService.unirseJuego(this.juego);
        this.tiempoComenzarAudio = (this.juego
          .nivelJuego as NivelJuegoInterface).configuraciones.tiempoPitido;
        this.setearEmisores();
      },
      error => {
        console.error({
          error,
          mensaje: 'Error al buscar juego'
        });
      }
    );
  }

  empezarRonda() {
    this.limpiarNoticiasYValoresEmisor();
    this.totalRondas = this.juego.numeroRondas;
    if (this.totalRondas > this.rondaActual) {
      this.rondaActual++;
      this.rondaAnterior = this.rondaActual - 1;
      const datosCrearRonda = {
        juego: this.idJuego,
        numeroRonda: this.rondaActual,
        estado: 'C',
        rondaAnterior: this.rondaAnterior
      };
      this._rondaRestService.create(datosCrearRonda).subscribe(
        r => {
          this.inhabilitarBotonEmpezarRonda = true;
          this.inhabilitarBotonMostrarNoticias = false;
          this.inhabilitarBotonOpcionesRonda = false;
          this.inhabilitarBotonCaja = false;
          this.idRondaAcrtual = r.id;
          this.cuentaRegresiva.stop();
          this._socketJuegoService
            .empezarRonda(
              this.rondaActual,
              this.juego,
              this.idRondaAcrtual,
              true
            )
            .then(() => {});
          this.empezarPartida();
          const rutaJuegoSeleccionado = [
            '../administrador',
            'menu',
            'juegos',
            'juego-seleccionado',
            this.idJuego
          ];
          this._router.navigate(rutaJuegoSeleccionado, {
            queryParams: {
              ronda: this.rondaActual,
              idRonda: this.idRondaAcrtual,
              caja: this.inhabilitarBotonCaja,
              empezarRonda: this.inhabilitarBotonEmpezarRonda,
              mostrarNoticias: this.inhabilitarBotonMostrarNoticias,
              opcionesRonda: this.inhabilitarBotonOpcionesRonda
            }
          });
        },
        error => {
          console.error({
            error,
            mensaje: 'Error al crear ronda'
          });
          this._toasterService.pop('error', 'Error', 'Error al empezar ronda');
        }
      );
    }
  }

  cargarNoticiasYValoresAEmisoresAComponentes(noticiasRonda) {
    try {
      this.setearNoticias(noticiasRonda);
    } catch (e) {
      console.error(e);
      this._toasterService.pop('error', 'Error', 'Error al mostrar noticias');
    }
  }

  mostrarNoticiaNormal() {
    this.mostrarOcultarNoticias(TipoNoticias.NORMAL);
  }

  mostrarOcultarNoticias(idTipo) {
    this.inhabilitarBotonMostrarNoticias = true;
    this.inhabilitarBotonOpcionesRonda = true;

    this._cargandoService.habilitarCargando();
    const noticiasMostrarOcultar = (this.verNoticias = !this.verNoticias);
    const datos: any = {
      idJuego: +this.idJuego,
      idNivel: (this.juego.nivelJuego as NivelJuegoInterface).id,
      idTipo,
      idRonda: this.idRondaJuego,
      noticiasMostrarOcultar
    };
    this._noticiaRondaRestService.obtenerNoticiasRondaRandom(datos).subscribe(
      async noticiasRonda => {
        this.abrirModalMostrarNoticias(noticiasRonda);
        this._cargandoService.deshabilitarCargando();
        try {
          await this._socketJuegoService.enviarNoticias({
            noticiasMostrarOcultar,
            noticiasRonda,
            juego: this.juego
          });
        } catch (e) {
          console.error(e);
        }
      },
      error => {
        this._toasterService.pop(
          'error',
          'Error',
          'Error al traer las noticias por ronda'
        );
        this._cargandoService.deshabilitarCargando();
        console.error(error);
      }
    );
  }

  async mostrarAyuda() {
    if (!this.verAyuda) {
      this._toasterService.pop(
        'success',
        'Ayuda habilitada',
        'Se habilito correctamente'
      );
    } else {
      this._toasterService.pop(
        'success',
        'Ayuda deshabilitada',
        'Se deshabilito correctamente'
      );
    }
    const ayudaMostrarOcultar = (this.verAyuda = !this.verAyuda);
    const datos = {
      idJuego: this.juego.id,
      mostrarAyuda: ayudaMostrarOcultar,
      nombreSala: this.juego.nombreSala
    };

    this._socketJuegoService.enviarAyuda(datos).then(respuestaRecibida => {
      this.juego.mostrarAyuda = respuestaRecibida.respuesta.mostrarAyuda;
    });
  }

  setearNoticias(noticiasRonda) {
    this.noticias = [];
    if (noticiasRonda.noticiaEspecial) {
      this.noticias = [
        this.setearNoticiaAMostrar(
          noticiasRonda.noticiaEspecial,
          noticiasRonda.esPositiva
        )
      ];
    } else {
      if (noticiasRonda.noticiasRondaPositivas) {
        this.noticias = this.iterarNoticiasAMostrar(
          noticiasRonda.noticiasRondaPositivas,
          true
        );
      }
      if (noticiasRonda.noticiasRondaNegativas) {
        this.noticias = this.iterarNoticiasAMostrar(
          noticiasRonda.noticiasRondaNegativas,
          false
        );
      }
      if (
        noticiasRonda.noticiasRondaPositivas &&
        noticiasRonda.noticiasRondaNegativas
      ) {
        const noticiasPositivas = this.iterarNoticiasAMostrar(
          noticiasRonda.noticiasRondaPositivas,
          true
        );
        const noticiasNegativas = this.iterarNoticiasAMostrar(
          noticiasRonda.noticiasRondaNegativas,
          false
        );
        this.noticias = noticiasPositivas.concat(noticiasNegativas);
      }
    }
  }

  iterarNoticiasAMostrar(noticiasRonda, esPositiva) {
    return eliminarElementosRepetidosArreglo(
      noticiasRonda.map(noticiaRonda => {
        const noticia = noticiaRonda.noticiaEmisor.noticia;
        return this.setearNoticiaAMostrar(noticia, esPositiva);
      })
    );
  }

  setearNoticiaAMostrar(noticia, esPositiva): NoticiaCardInterface {
    return {
      id: noticia.id,
      titulo: noticia.titulo,
      descripcion: noticia.descripcion,
      esPositiva
    };
  }

  setearValoresEmisores(noticiasRonda, idTipo) {
    if (idTipo) {
      this.inhabilitarBotonMostrarNoticias = true;
      if (
        idTipo === TipoNoticias.SPLIT ||
        idTipo === TipoNoticias.CONTRASPLIT
      ) {
        this.idEmisoresNegativos = [];
        this.idEmisoresPositivos = [];
      } else {
        this.idEmisoresPositivos = [];
        this.idEmisoresNegativos = [];
        const noticiasRondaPositivas = noticiasRonda.noticiasRondaPositivas;
        const noticiasRondaNegativas = noticiasRonda.noticiasRondaNegativas;
        this.idEmisoresPositivos = noticiasRondaPositivas
          ? this.obtenerIdsEmisores(noticiasRondaPositivas)
          : [];
        this.idEmisoresNegativos = noticiasRondaNegativas
          ? this.obtenerIdsEmisores(noticiasRondaNegativas)
          : [];
      }
      this.obtenerJuegoPorId();
    }
  }

  obtenerIdsEmisores(noticiasRonda) {
    return noticiasRonda.map(noticiaRonda => {
      return {
        idEmisor: noticiaRonda.idEmisor,
        valorAfecta: noticiaRonda.valorAfecta,
      };
    });
  }

  abrirModalRegistrarJugada() {
    const modalRegistrarJugadaJugador$ = this.dialog.open(
      RegistrarJugadasComponent,
      {
        width: '1500px',
        maxWidth: '1500px',
        data: {
          esAdministrador: this.esAdministrador,
          rondaActual: this.rondaActual,
          idRonda: this.idRondaJuego,
          juego: this.idJuego,
          nivel: this.juego.nivelJuego.nombre
        }
      }
    );
    modalRegistrarJugadaJugador$.afterClosed().subscribe(jugada => {
      if (jugada) {
        this._toasterService.pop(
          'success',
          'Correctamente',
          'Jugada registrada'
        );
      }
    });
  }

  abrirModalVerJugadas() {
    const participante = this._localStorageService.obtenerDatosLocalStorage(
      this.idJuego
    );
    const idJugador = participante[0].idParticipante;
    const nombreJugador = participante[0].nombreParticipante;
    const ventanaModal = this.matDialog.open(TablaJugadasComponent, {
      width: '800px',
      data: {
        idJuego: this.idJuego,
        idParticipante: idJugador,
        nombre: nombreJugador
      }
    });
    const resultadoModal$ = ventanaModal.afterClosed();
    resultadoModal$.subscribe(respuesta => {});
  }

  private empezarPartida() {
    const consulta = {
      estado: 'J'
    };
    this._juegoRestService.updateOne(this.idJuego, consulta).subscribe(
      async () => {
        try {
          await this._socketJuegoService.cambioJuego(this.idJuego);
        } catch (e) {
          console.error({
            error: e,
            mensaje: 'Error al obtener participantes'
          });
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  private setearEmisores() {
    this.acciones = [];
    this.precio = [];
    this.emisores = this.emisoresJuego.map(emisorJuego => {
      return emisorJuego.emisor;
    });
    this.emisoresJuego
      .filter(emisorJuego => {
        return emisorJuego.emisor.vendeAcciones === 1;
      })
      .map((emisorJuego, indice) => {
        this.nombreEmisores[indice] = emisorJuego.emisor.nombre;
        this.acciones[indice] = +emisorJuego.numeroAcciones;
        this.precio[indice] = +emisorJuego.precioActual;
      });
    this.setearGrafico();
  }

  setearGrafico() {
    this.informacionGrafico = {
      labels: this.nombreEmisores,
      datasets: [
        {
          label: 'ACCIONES',
          backgroundColor: '#7fb737',
          borderColor: '#7fb737',
          data: this.acciones,
          datalabels: {
            labels: {
              title: null
            }
          }
        },
        {
          label: 'PRECIOS',
          backgroundColor: '#081971',
          borderColor: '#081971',
          data: this.precio
        }
      ]
    };
  }

  abrirModalMostrarNoticias(noticiasRonda) {
    this.mostarOcultarNoticia = false;
    this.cargarNoticiasYValoresAEmisoresAComponentes(noticiasRonda);
    const ventanaModal = this.matDialog.open(ModalMostrarNoticiaComponent, {
      width: '1500px',
      position: {
        bottom: 'top'
      },
      data: {
        noticias: this.noticias
      }
    });
    const resultadoModal$ = ventanaModal.afterClosed();
    resultadoModal$.subscribe(respuestaModalMostrarNoticias => {
      this.mostarOcultarNoticia = true;
    });
  }

  abrirModalOpcionesRonda() {
    this.inhabilitarBotonMostrarNoticias = true;
    this.inhabilitarBotonOpcionesRonda = true;
    const ventanaModal = this.matDialog.open(OpcionesRondaComponent, {
      width: '800px',
      data: {
        juego: this.juego
      }
    });
    const resultadoModal$ = ventanaModal.afterClosed();
    resultadoModal$.subscribe(tipoNoticia => {
      if (tipoNoticia) {
        this.mostrarOcultarNoticias(tipoNoticia.id);
      } else {
        this.inhabilitarBotonMostrarNoticias = false;
        this.inhabilitarBotonOpcionesRonda = false;
      }
    });
  }

  abrirModalCaja() {
    this.dialog.open(RegistrarJugadasComponent, {
      width: '1500px',
      maxWidth: '1500px',
      data: {
        esAdministrador: true,
        rondaActual: this.rondaActual,
        idRonda: this.idRondaJuego,
        juego: this.idJuego,
        nivel: this.juego.nivelJuego.nombre
      }
    });
  }

  terminarJuego() {
    const dialogRef = this.dialog.open(ModalConfirmacionComponent, {
      width: '800px',
      data: {
        mensaje: '¿Está seguro que desea terminar el juego?',
        titulo: 'Finalizar Juego',
        nombreBotonTrue: 'Terminar',
        nombreBotonFalse: 'cancelar'
      }
    });
    const respuestaModal$ = dialogRef.afterClosed();
    respuestaModal$.subscribe(respuestaModalConfirmacion => {
      if (respuestaModalConfirmacion) {
        this.cuentaRegresiva.stop();
        this._cargandoService.habilitarCargando();
        const estadoJuegoActualizar = {
          estado: 'CO'
        };
        this._juegoRestService
          .updateOne(this.idJuego, estadoJuegoActualizar)
          .subscribe(
            respuesta => {
              this._cargandoService.deshabilitarCargando();
            },
            error => {
              console.error('Error', error);
              this._cargandoService.deshabilitarCargando();
            }
          );
        const ventanaModal = this.matDialog.open(RankingJugadoresComponent, {
          width: '800px',
          height: '800px',
          data: {
            juego: this.juego,
            esAdministrador: true
          }
        });
        const resultadoModal$ = ventanaModal.afterClosed();
        resultadoModal$.subscribe(respuestaModalRanking => {});
      }
    });
  }

  terminarJuegoJugador(raking) {
    const ventanaModal = this.matDialog.open(RankingJugadoresComponent, {
      width: '800px',
      height: '800px',
      data: {
        juego: this.juego,
        rakingJugadores: raking,
        esAdministrador: false
      }
    });
    const resultadoModal$ = ventanaModal.afterClosed();
    resultadoModal$.subscribe(tipoNoticia => {});
  }

  limpiarNoticiasYValoresEmisor() {
    this.idEmisoresPositivos = [];
    this.idEmisoresNegativos = [];
    this.noticias = [];
  }

  terminarRonda() {
    this.cuentaRegresiva.stop();
    this.inhabilitarBotonEmpezarRonda = false;
    this.inhabilitarBotonCaja = true;
    const datos = {
      idRonda: this.idRondaJuego
    };
    this._juegoRestService.calcularRondaJugadas(datos).subscribe(
      respuesta => {
        this.cuentaRegresiva.stop();
        const rutaJuegoSeleccionado = [
          '../administrador',
          'menu',
          'juegos',
          'juego-seleccionado',
          this.idJuego
        ];
        this._router.navigate(rutaJuegoSeleccionado, {
          queryParams: {
            ronda: this.rondaActual,
            idRonda: this.idRondaJuego,
            caja: this.inhabilitarBotonCaja,
            empezarRonda: this.inhabilitarBotonEmpezarRonda
          }
        });
        if (respuesta.data) {
          this._toasterService.pop(
            'success',
            'Éxito',
            'La ronda se cálculo correctamente'
          );
        } else {
          this._toasterService.pop(
            'warning',
            '!Advertencia¡',
            'No Existen Jugadas en la ronda'
          );
        }
        this.limpiarNoticiasYValoresEmisor();
        this._socketJuegoService.terminarRonda(true);
        this._socketJuegoService.empezarRonda(
          this.rondaActual,
          this.juego,
          this.idRondaAcrtual,
          false
        );
      },
      error => {
        console.error('Error', error);
        this._toasterService.pop('error', 'Fallo', 'Fallo del servidor');
      }
    );
  }

  consultarRentaFijaVigentes() {
    const consultaRFRonda = {
      idJuego: this.idJuego,
      ronda: this.rondaActual
    };
    this._rentaFijaRondaRestService
      .consultarRentaFija(consultaRFRonda)
      .subscribe((rentaFijasRonda: RentaFijaRondaInterface[]) => {
        this.arregloRF = rentaFijasRonda !== null ? rentaFijasRonda : [];
      });
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach(s => s.unsubscribe());
  }

  handleEvent(evento: CountdownEvent) {
    if (evento.left === this.tiempoComenzarAudio * 1000) {
      this.audioFinalizarRonda.src =
        '../../../../assets/audios/audio-terminar-ronda.mp3';
      this.audioFinalizarRonda.loop = true;
      this.audioFinalizarRonda.play();
    } else {
      this.audioFinalizarRonda.pause();
    }
    if (evento.action === 'done') {
      this.inhabilitarBotonRealizarJugada = true;
    }
  }

  async empezarTiempo() {
    this.cuentaRegresiva.restart();
    const tiempoRonda = (await this._socketJuegoService.empezarContador(
      this.juego
    )) as { tiempoRonda: number };
    this.tiempo = tiempoRonda.tiempoRonda;
  }
}

export interface RespuestaAyudaSocketInterface {
  estado: boolean | number;
  ayudaRonda: any[];
}
