import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_ENVIRONMENT } from './environment/config';
import { RolModule } from './rol/rol.module';
import { init } from './environment/init';
import { RolEntity } from './rol/rol.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import { RolService } from './rol/rol.service';
import { crearDatos } from 'datos-prueba/crearDatos';


init();

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: CONFIG_ENVIRONMENT.dbConnections.mysql.type,
            name: 'default',
            host: CONFIG_ENVIRONMENT.dbConnections.mysql.host,
            port: CONFIG_ENVIRONMENT.dbConnections.mysql.port,
            username: CONFIG_ENVIRONMENT.dbConnections.mysql.username,
            password: CONFIG_ENVIRONMENT.dbConnections.mysql.password,
            database: CONFIG_ENVIRONMENT.dbConnections.mysql.database,
            entities: [
                RolEntity,
            ],
            synchronize: CONFIG_ENVIRONMENT.dbConnections.mysql.synchronize,
            ssl: CONFIG_ENVIRONMENT.dbConnections.mysql.ssl,
            keepConnectionAlive:
            CONFIG_ENVIRONMENT.dbConnections.mysql.keepConnectionAlive,
            retryDelay: CONFIG_ENVIRONMENT.dbConnections.mysql.retryDelay,
            dropSchema: CONFIG_ENVIRONMENT.dbConnections.mysql.dropSchema,
            retryAttempts: CONFIG_ENVIRONMENT.dbConnections.mysql.retryAttempts,
            connectTimeout: CONFIG_ENVIRONMENT.dbConnections.mysql.connectTimeout,
            charset: CONFIG_ENVIRONMENT.dbConnections.mysql.charset,
            timezone: CONFIG_ENVIRONMENT.dbConnections.mysql.timezone,
        }),
        RolModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(
        private readonly _appService: AppService,
        private readonly _rolService: RolService,
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
             console.log('asfsdfsdfsdf');
            const respuestaRol = await crearDatos(
                this._rolService,
                '/datos-rol.json',
            );
            console.log('respuesta rol', respuestaRol);
        } catch (e) {
            console.error('Error creando datos de prueba', e);
            return false;
        }

    }
}
