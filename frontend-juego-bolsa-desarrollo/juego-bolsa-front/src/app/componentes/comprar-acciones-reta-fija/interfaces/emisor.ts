export interface Emisor {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  nombre?: string;
  descripcion?: string;
  vendeRentaFija?: number;
  vendeAcciones?: number;
  habilitado?: number;
  pathLogo?: string;
}
