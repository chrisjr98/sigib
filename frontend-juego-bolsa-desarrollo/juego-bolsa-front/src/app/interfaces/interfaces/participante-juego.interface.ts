import {AccionesParticipanteInterface} from './acciones-participante.interface';
import {JugadaParticipanteInterface} from './jugada-participante.interface';
import {ParticipanteInterface} from './participante.interface';
import {JuegoInterface} from './juego.interface';

export interface ParticipanteJuegoInterface {
    id: number;
    habilitado: number;
    razonDeshabilitado: string;
    dineroEmpieza: number;
    dineroActual: number;
    dineroGanado: number;
    dineroGastado: number;
    accionesParticipante?: AccionesParticipanteInterface[];
    jugadasParticipante?: JugadaParticipanteInterface[];
    participante?: ParticipanteInterface;
    juego?: JuegoInterface;
}
