import {JuegoInterface} from './juego.interface';

export interface EmpezarRondaInterface {
  ronda: number;
  juego: JuegoInterface;
  idRonda: number;
  empezarRonda: boolean;
}
