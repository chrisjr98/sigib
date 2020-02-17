import { Module } from "@nestjs/common";
import { GradoController } from "./grado.controller";
import { GradoService } from "./grado.service";
import { GradoEntity } from "./grado.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([GradoEntity], "default")],
    providers: [GradoService],
    controllers: [GradoController],
    exports: [GradoService]
})
export class GradoModule {}
