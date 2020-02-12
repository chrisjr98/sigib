import { readFileSync } from 'fs';
import { PrincipalService } from 'src/principal/principal.service';

export async function crearDatos(
  servicio: PrincipalService<any>,
  rutaDatos: string,
) {
  try {
    const registrosParseados = JSON.parse(
      readFileSync(__dirname + rutaDatos, 'utf-8').toString(),
    );
    const respuesta = await servicio.createMany(registrosParseados); // papas
    return { data: respuesta, mensaje: 'Registros creados' };
  } catch (e) {
    console.error(e);
    throw new Error(
      JSON.stringify({ mensaje: 'Error creando registros', error: 500 }),
    );
  }
}
