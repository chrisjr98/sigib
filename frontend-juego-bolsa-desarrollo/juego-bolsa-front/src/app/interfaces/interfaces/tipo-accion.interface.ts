import {JugadaParticipanteInterface} from './jugada-participante.interface';

export interface TipoAccionInterface {
    id: number;
    tipo: string;
    habilitado: number;
    jugadasParticipante: JugadaParticipanteInterface[];
}
