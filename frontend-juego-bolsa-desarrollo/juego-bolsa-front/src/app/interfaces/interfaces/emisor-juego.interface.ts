import {AccionesParticipanteInterface} from './acciones-participante.interface';
import { AccionesEmisorRondaInterface } from './acciones-emisor-ronda.interface';
import {RentaFijaInterface} from './renta-fija.interface';
import {JuegoInterface} from './juego.interface';
import {EmisorInterface} from './emisor.interface';

export interface EmisorJuegoInterface {
    id: number;
    precioActual: number;
    numeroAcciones: number;
    numeroAccionesVendidas: number;
    numeroAccionesTotales: number;
    accionesParticipante: AccionesParticipanteInterface[];
    accionesEmisorRondaInterface: AccionesEmisorRondaInterface[];
    rentasFijas: RentaFijaInterface[];
    juego: JuegoInterface;
    emisor: EmisorInterface;
    valorAfecta?: number;
}
