import {ParticipanteJuegoInterface} from './participante-juego.interface';
import {EmisorJuegoInterface} from './emisor-juego.interface';

export interface AccionesParticipanteInterface {
    id: number;
    cantidad: number;
    participanteJuego: ParticipanteJuegoInterface;
    emisorJuego: EmisorJuegoInterface;
}
