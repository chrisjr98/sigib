import {ParticipanteJuegoInterface} from './participante-juego.interface';

export interface ParticipanteInterface {
  id?: number;
  nombre: string;
  password: string;

  participantesJuego?: ParticipanteJuegoInterface[];
}
