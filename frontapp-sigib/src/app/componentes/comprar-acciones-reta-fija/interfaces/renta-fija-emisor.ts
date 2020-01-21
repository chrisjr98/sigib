import {Emisor} from './emisor';

export interface RentaFijaEmisor {
  id?: number;
  tiempo?: number;
  habilitado?: number;
  emisor?: Emisor | number | any;
  rentaFija?: any | number | any;
}
