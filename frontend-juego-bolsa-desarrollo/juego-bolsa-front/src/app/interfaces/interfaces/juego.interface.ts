import { ParticipanteJuegoInterface } from './participante-juego.interface';
import { EmisorJuegoInterface } from './emisor-juego.interface';
import { RondaInterface } from './ronda.interface';
import { NivelJuegoInterface } from './nivel-juego.interface';

export interface JuegoInterface {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  habilitado?: number;
  tiempoRonda?: number;
  numeroRondas?: number;
  passwordRonda?: string;
  nombreSala?: string;
  nombreJuego?: string;
  split?: number;
  splitJugado?: number;
  contraSplit?: number;
  contraSplitJugado?: number;
  boom?: number;
  boomJugado?: number;
  crush?: number;
  crushJugado?: number;
  stockAcciones?: number;
  estado?: string;
  mostrarAyuda?: number;
  participantesJuego?: ParticipanteJuegoInterface[];
  emisoresJuego?: EmisorJuegoInterface[];
  rondas?: RondaInterface[];
  nivelJuego?: NivelJuegoInterface | number | any;
  path?: string;
}
