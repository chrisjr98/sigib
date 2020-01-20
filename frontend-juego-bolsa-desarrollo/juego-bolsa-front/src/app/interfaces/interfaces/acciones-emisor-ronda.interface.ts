import {JugadaParticipanteInterface} from './jugada-participante.interface';
import {EmisorJuegoInterface} from './emisor-juego.interface';
import {RondaInterface} from './ronda.interface';

export interface AccionesEmisorRondaInterface {
    id: number;
    precio: number;
    jugadasParticipante: JugadaParticipanteInterface[];
    emisorJuego: EmisorJuegoInterface;
    ronda: RondaInterface;
}
