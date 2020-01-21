export interface UsuarioInterface {
    nombres: string;

    correo: string;

    password?: string;

    rol: string;

    id?: number;

    apellidos: string;

    direccion: string;

    nick: string;

    activo?: boolean;

    rutaImagen: string;
}
