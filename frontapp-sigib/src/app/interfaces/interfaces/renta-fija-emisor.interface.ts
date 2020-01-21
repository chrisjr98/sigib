import {EmisorInterface} from './emisor.interface';
import {RentaFijaInterface} from './renta-fija.interface';
import {NivelJuegoInterface} from './nivel-juego.interface';

export interface RentaFijaEmisorInterface {
  id: number;
  tiempo?: number;
  precio?: number;
  rendimiento?: number;
  habilitado?: number;
  emisor?: EmisorInterface;
  rentaFija?: RentaFijaInterface;
  nivelJuego?: NivelJuegoInterface;
}
