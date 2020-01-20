import {ParticipanteJuegoInterface} from './participante-juego.interface';
import {TipoAccionInterface} from './tipo-accion.interface';
import {RondaInterface} from './ronda.interface';
import {RentaFijaInterface} from './renta-fija.interface';
import {AccionesEmisorRondaInterface} from './acciones-emisor-ronda.interface';

export interface JugadaParticipanteInterface {
    id: number;
    cantidad: number;
    estado: string;
    mensajeError: string;
    participanteJuego: ParticipanteJuegoInterface;
    tipoAccion: TipoAccionInterface;
    ronda: RondaInterface;
    rentaFija: RentaFijaInterface;
    accionesEmisorRonda: AccionesEmisorRondaInterface;
    updatedAt?: Date;
    hora?: string | Date | number;
    tipo?: string;
  emisor?: string;
  participante?: string;
}
