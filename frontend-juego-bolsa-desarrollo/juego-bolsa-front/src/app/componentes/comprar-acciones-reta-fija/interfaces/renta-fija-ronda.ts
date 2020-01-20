import {RentaFijaEmisor} from './renta-fija-emisor';

export interface RentaFijaRonda {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  precio?: string;
  rendimiento?: string;
  estado?: string;
  ronda?: any | number;
  juego?: any | number;
  rentaFijaEmisor?: RentaFijaEmisor | number | any;
  cantidadAComprar?: number;
}
