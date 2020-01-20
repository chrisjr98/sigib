export interface ConfiguracionesInterface {
  id?: number;
  dineroJugador?: number;
  stockAcciones?: number;
  rangoInicialPvpAccion?: number;
  rangoFinPvpAccion?: number;
  rangoInicialPvpRenta?: number;
  rangoFinPvpRenta?: number;
  rangoInicialRendRenta?: number;
  rangoFinRendRenta?: number;
  rangoInicialNotiPos?: number;
  rangoFinNotiPos?: number;
  rangoInicialNotiNeg?: number;
  rangoFinNotiNeg?: number;
  tiempoPitido?: number;

  rangoIniBoom?: number;
  rangoFinBoom?: number;
  rangoIniCrush?: number;
  rangoFinCrush?: number;
  rangoIniSplit?: number;
  rangoFinSplit?: number;
  rangoIniConSplit?: number;
  rangoFinConSplit?: number ;
  nivelJuego?: number ;
}
