import { ProductoraInterface } from '../../productora/interfaces/productora.interface';

export interface PeliculaInterface {

    id?: number;

    nombre: string;

    anioProduccion: number;

    genero: string;

    taquilla: number;

    rating: number;

    premios: number;

    productora?: ProductoraInterface;

    activo?: boolean;
}
