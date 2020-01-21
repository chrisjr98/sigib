import {JugadaParticipanteInterface} from './jugada-participante.interface';
import {AccionesEmisorRondaInterface} from './acciones-emisor-ronda.interface';
import {NoticiasRondaInterface} from './noticias-ronda.interface';
import {RentaFijaInterface} from './renta-fija.interface';
import {JuegoInterface} from './juego.interface';

export interface RondaInterface {
    id: number;
    numeroRonda: number;
    estado: string;
    jugadasParticipante: JugadaParticipanteInterface[];
    accionesEmisorRonda: AccionesEmisorRondaInterface[];
    noticiasRonda: NoticiasRondaInterface[];
    rentasFijas: RentaFijaInterface[];
    juego: JuegoInterface[];
}
