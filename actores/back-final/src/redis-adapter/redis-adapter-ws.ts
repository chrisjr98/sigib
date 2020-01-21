import { IoAdapter } from '@nestjs/websockets';
import * as redisIoAdapter from 'socket.io-redis';
import { localEnvironment } from 'local-environment';

const redisAdapter = redisIoAdapter({ host: localEnvironment.hostRedis, port: localEnvironment.puertoRedis});

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
