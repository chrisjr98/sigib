import { Toast } from 'angular2-toaster';

export const toastCrear: Toast = {
    type: 'success',
    title: 'Correcto',
    body: 'Creado correctamente',
    showCloseButton: true
};

export const toastEditar: Toast = {
    type: 'success',
    title: 'Correcto',
    body: 'Guardado Correctamente',
    showCloseButton: true
};

export const toastFoto: Toast = {
    type: 'success',
    title: 'Correcto',
    body: 'Foto cambiada Correctamente, click en recargar',
    showCloseButton: true
};

export const toastErrorCrear: Toast = {
    type: 'error',
    title: 'Error',
    body: 'Error creando',
    showCloseButton: true
};

export const toastErrorEditar: Toast = {
    type: 'error',
    title: 'Error',
    body: 'Error editando',
    showCloseButton: true
};

export const toastWarningFoto: Toast = {
    type: 'warning',
    title: 'Warning',
    body: 'No se cambio la foto',
    showCloseButton: true
};

export const toastFalloLogin: Toast = {
    type: 'warning',
    title: 'Fallo',
    body: 'Fallo Login',
    showCloseButton: true
};

export const toastErrorConexionServidor: Toast = {
    type: 'error',
    title: 'Error',
    body: 'Fallo conexion al servidor',
    showCloseButton: true
};

export const toastExitoReset: Toast = {
    type: 'success',
    title: 'Exito',
    body: 'Se restauro correctamente',
    showCloseButton: true
};

export const toastErrorReset: Toast = {
    type: 'error',
    title: 'Error',
    body: 'Fallo reseteando',
    showCloseButton: true
};
