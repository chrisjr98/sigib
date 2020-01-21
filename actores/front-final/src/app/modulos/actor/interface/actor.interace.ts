import { PeliculaInterface } from "../../pelicula/interfaces/pelicula.interface";

export interface ActorInterface {
    nombre: string;
    sexo: string;
    pais: string;
    nominaciones: number;
    premios: number;
    id: number;
    activo: boolean;
    pelicula?: PeliculaInterface;
}
