import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG_ENVIRONMENT } from './environment/config';
import { init } from './environment/init';
import * as session from 'express-session';
import * as Auth0Strategy from 'passport-auth0';
import * as passport from 'passport';
import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
init();

async function bootstrap() {
    const app: NestExpressApplication = (await NestFactory.create(
        AppModule,
    )) as any;

    app.useStaticAssets(__dirname + '/../publico');
    app.set('view engine', 'ejs');
    const RedisStore = require('connect-redis')(session);
    app.use(
        session({
            // store: new RedisStore(CONFIG_ENVIRONMENT.redisStoreOptions),
            secret: CONFIG_ENVIRONMENT.expressSession.secret,
            cookie: CONFIG_ENVIRONMENT.expressSession.cookie,
            resave: CONFIG_ENVIRONMENT.expressSession.resave,
            saveUninitialized: CONFIG_ENVIRONMENT.expressSession.saveUninitialized,
            unset: CONFIG_ENVIRONMENT.expressSession.unset,
        }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    app.enableCors();
    await app.listen(Number(CONFIG_ENVIRONMENT.puertoLevanta));
}

bootstrap();
