import { Module, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CONFIG_ENVIRONMENT } from "./environment/config";
import { RolModule } from "./rol/rol.module";
import { init } from "./environment/init";
import { RolEntity } from "./rol/rol.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolService } from "./rol/rol.service";
import { crearDatos } from "datos-prueba/crearDatos";
import { EstudianteModule } from "./estudiante/estudiante.module";
import { ProfesorModule } from "./profesor/profesor.module";
import { CarreraModule } from "./carrera/carrera.module";
import { MateriaModule } from "./materia/materia.module";
import { CursoModule } from "./curso/curso.module";
import { RegistroNotaModule } from "./registro-nota/registro-nota.module";
import { MatriculaModule } from "./matricula/matricula.module";
import { RegistroAsistenciaModule } from "./registro-asistencia/registro-asistencia.module";
import { EstudianteEntity } from "./estudiante/estudiante.entity";
import { MateriaEntity } from "./materia/materia.entity";
import { CarreraEntity } from "./carrera/carrera.entity";
import { CursoEntity } from "./curso/curso.entity";
import { MatriculaEntity } from "./matricula/matricula.entity";
import { ProfesorEntity } from "./profesor/profesor.entity";
import { RegistroAsistenciaEntity } from "./registro-asistencia/registro-asistencia.entity";
import { RegistroNotaEntity } from "./registro-nota/registro-nota.entity";
import { EstudianteService } from "./estudiante/estudiante.service";
import { CarreraService } from "./carrera/carrera.service";
import { MateriaService } from "./materia/materia.service";
import { ProfesorService } from "./profesor/profesor.service";
import { CursoService } from "./curso/curso.service";
import { MatriculaService } from "./matricula/matricula.service";
import { RegistroAsistenciaService } from "./registro-asistencia/registro-asistencia.service";
import { RegistroNotaService } from "./registro-nota/registro-nota.service";
import { UsuarioModule } from "./usuario/usuario.module";
import { UsuarioEntity } from "./usuario/usuario.entity";
import { UsuarioService } from "./usuario/usuario.service";
import { GradoEntity } from "./grado/grado.entity";
import { GradoModule } from "./grado/grado.module";
import { GradoService } from "./grado/grado.service";

init();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: CONFIG_ENVIRONMENT.dbConnections.mysql.type,
            name: "default",
            host: CONFIG_ENVIRONMENT.dbConnections.mysql.host,
            port: CONFIG_ENVIRONMENT.dbConnections.mysql.port,
            username: CONFIG_ENVIRONMENT.dbConnections.mysql.username,
            password: CONFIG_ENVIRONMENT.dbConnections.mysql.password,
            database: CONFIG_ENVIRONMENT.dbConnections.mysql.database,
            entities: [
                RolEntity,
                EstudianteEntity,
                MateriaEntity,
                CarreraEntity,
                CursoEntity,
                MatriculaEntity,
                ProfesorEntity,
                RegistroAsistenciaEntity,
                RegistroNotaEntity,
                UsuarioEntity,
                GradoEntity
            ],
            synchronize: CONFIG_ENVIRONMENT.dbConnections.mysql.synchronize,
            ssl: CONFIG_ENVIRONMENT.dbConnections.mysql.ssl,
            keepConnectionAlive:
                CONFIG_ENVIRONMENT.dbConnections.mysql.keepConnectionAlive,
            retryDelay: CONFIG_ENVIRONMENT.dbConnections.mysql.retryDelay,
            dropSchema: CONFIG_ENVIRONMENT.dbConnections.mysql.dropSchema,
            retryAttempts: CONFIG_ENVIRONMENT.dbConnections.mysql.retryAttempts,
            connectTimeout:
                CONFIG_ENVIRONMENT.dbConnections.mysql.connectTimeout,
            charset: CONFIG_ENVIRONMENT.dbConnections.mysql.charset,
            timezone: CONFIG_ENVIRONMENT.dbConnections.mysql.timezone
        }),
        RolModule,
        EstudianteModule,
        ProfesorModule,
        CarreraModule,
        MateriaModule,
        CursoModule,
        RegistroNotaModule,
        MatriculaModule,
        RegistroAsistenciaModule,
        UsuarioModule,
        GradoModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    constructor(
        private readonly _appService: AppService,
        private readonly _rolService: RolService,
        private readonly _estudianteService: EstudianteService,
        private readonly _carreraService: CarreraService,
        private readonly _materiaService: MateriaService,
        private readonly _profesorService: ProfesorService,
        private readonly _cursoSevice: CursoService,
        private readonly _matriculaService: MatriculaService,
        private readonly _registroAsistenciaService: RegistroAsistenciaService,
        private readonly _registroNotasService: RegistroNotaService,
        private readonly _usuarioService: UsuarioService,
        private readonly _gradoService: GradoService
    ) {
        if (CONFIG_ENVIRONMENT.dbConnections.crearDatosPrueba) {
            this.crearDatosDePrueba()
                .then(datos => {
                    console.log(datos);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    async crearDatosDePrueba() {
        try {
            const respuestaRol = await crearDatos(
                this._rolService,
                "/datos-rol.json"
            );
            console.log("respuesta rol", respuestaRol);
            const respuestaCarrera = await crearDatos(
                this._carreraService,
                "/carrera.json"
            );
            console.log("respuesta carrera", respuestaCarrera);
            const respuestaEstudiante = await crearDatos(
                this._estudianteService,
                "/estudiante.json"
            );
            console.log("respuesta estudiante", respuestaEstudiante);
            const respuestaMaterias = await crearDatos(
                this._materiaService,
                "/materias.json"
            );
            console.log("respuesta materias", respuestaMaterias);
            const respuestaProfesor = await crearDatos(
                this._profesorService,
                "/profesor.json"
            );
            console.log("respuesta profesor", respuestaProfesor);
            const respuestaCursos = await crearDatos(
                this._cursoSevice,
                "/cursos.json"
            );
            console.log("respuesta cursos", respuestaCursos);
            const respuestaMatricula = await crearDatos(
                this._matriculaService,
                "/matricula.json"
            );
            console.log("respuesta matricula", respuestaMatricula);
            const respuestaRegistroAsistencia = await crearDatos(
                this._registroAsistenciaService,
                "/registroasistencia.json"
            );
            console.log(
                "respuesta registro asistencia",
                respuestaRegistroAsistencia
            );
            const respuestaRegistroNotas = await crearDatos(
                this._registroNotasService,
                "/registronotas.json"
            );
            console.log("respuesta registro notas", respuestaRegistroNotas);
            const respuestaUsuarios = await crearDatos(
                this._usuarioService,
                "/datos-usuario.json"
            );
            console.log("respuesta usuarios", respuestaUsuarios);
            const respuestaGrado = await crearDatos(
                this._gradoService,
                "/grado.json"
            );
            console.log("respuesta grado", respuestaGrado);
        } catch (e) {
            console.error("Error creando datos de prueba", e);
            return false;
        }
    }
}
