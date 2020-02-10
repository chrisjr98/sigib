import { Module } from '@nestjs/common';
import { PrincipalController } from './principal.controller';

@Module({
  controllers: [PrincipalController],
})
export class PrincipalModule {}
