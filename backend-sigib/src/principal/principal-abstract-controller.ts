import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Query,
  Req,
  Res,
  Delete,
  Put,
} from '@nestjs/common';
import { InterfaceError } from './interface-error';

export abstract class PrincipalAbstractController<CreateDto> {
  private readonly _servicio;
  constructor(servicio: any) {
    this._servicio = servicio;
  }
  @Get()
  async findAll(
    @Query('criterioBusqueda') criterioBusqueda,
  ): Promise<CreateDto[] | InterfaceError> {
    if (!criterioBusqueda) {
      return await this._servicio.find();
    }
    return await this._servicio.find(JSON.parse(criterioBusqueda));
  }
  @Get(':id')
  async findOne(@Param('id') id) {
    try {
      const respuesta = await this._servicio.findOne(id);
      return respuesta;
    } catch (error) {
      console.error('Error en controller findOne', error);
      return {
        error: 400,
        message: 'Error carga masiva(guardarFiles)',
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this._servicio.delete(id);
  }

  @Post()
  async create(@Body() registro) {
    return await this._servicio.create(registro);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() registro) {
    return await this._servicio.findOneByIdAndUpdate(id, registro);
  }
}
