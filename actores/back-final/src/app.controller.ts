import { Get, Controller, Post, UseInterceptors, FileInterceptor, UploadedFile, Body, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductoraService } from 'productora/productora.service';
import { localEnvironment } from 'local-environment';
import {storage} from 'opciones-multer';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,
              private readonly _productoraService: ProductoraService) { }

  @Get()
  root(): string {
    return this.appService.root();
  }

  @Post('subirFotoProductora')
  @UseInterceptors(FileInterceptor('file', {
    // dest: 'subidos/',
    storage,
  }))
  uploadFile(@UploadedFile() file, @Query('id') id: number) {
    // obtener la ruta imagen
    console.log(file);
    const rutaImagen = localEnvironment.urlServer + '/' + file.filename;
    this._productoraService.editar(+id, { rutaImagen});

  }
}
