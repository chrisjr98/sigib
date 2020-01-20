import {RentaFijaInterface} from './renta-fija.interface';
import {RondaInterface} from './ronda.interface';
import {NivelJuegoInterface} from './nivel-juego.interface';

export interface RentaFijaRondaInterface {
  id?: number;
  precio?: number;
  rendimiento?: number;
  tiempo?: number;
  rondaNumero?: number;
  rondaCobrar?: number;
  habilitado?: number;
  rentaFija?: RentaFijaInterface[];
  ronda?: RondaInterface[];
  nivelJuego?: NivelJuegoInterface[];
}
