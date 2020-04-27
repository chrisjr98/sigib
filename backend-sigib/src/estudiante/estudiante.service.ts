import { Injectable } from '@nestjs/common';
import { PrincipalService } from '../principal/principal.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import * as pdfMakePrinter from 'pdfmake/src/printer';
import * as fs from 'fs'
@Injectable()
export class EstudianteService extends PrincipalService<EstudianteEntity> {
    constructor(
        @InjectRepository(EstudianteEntity)
        // tslint:disable-next-line:variable-name
        _estudianteRepository: Repository<EstudianteEntity>,
    ) {
        super(_estudianteRepository, EstudianteEntity);
    }
    async crearReportePdf(consulta) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const registros = await this.find(consulta);
                    const configuracionFuente = {
                        Roboto: {
                            normal: __dirname + '/fonts/Roboto-Regular.ttf',
                            bold: __dirname + '/fonts/Roboto-Medium.ttf',
                            italics: __dirname + '/fonts/Roboto-Italic.ttf',
                            bolditalics: __dirname + '/fonts/Roboto-MediumItalic.ttf',
                        },
                    };
                    const printer = new pdfMakePrinter(configuracionFuente);
                    const pdfDoc = printer.createPdfKidDocument(
                        this.crearDefinicionDocumentoPDF(registros as EstudianteEntity[])
                    )
                    pdfDoc
                        .pipe(
                            fs.createWriteStream(
                                __dirname + '/reporte.pdf',
                            ),
                        )
                        .on('finish', () => {
                            resolve(
                                {
                                    mensaje: 'Archivo creado correctamente',
                                },
                            );
                        });
                } catch (e) {
                    console.error('Error creando pdf:', e);
                    reject(
                        {
                            error: 500,
                            mensaje: 'Error creando pdf',
                            errorCrudo: e,
                        },
                    );
                }
            });
    }

    crearDefinicionDocumentoPDF(registros: EstudianteEntity[]) {
        const titulosColumnas = [
            [{
                text: 'Codigo',
                style: 'tableHeader',
                rowSpan: 2,
            },
            {
                text: 'Cedula',
                style: 'tableHeader',
                rowSpan: 2,
            },
            {
                text: 'Nombre',
                style: 'tableHeader',
                rowSpan: 2,
            },
            {
                text: 'Apellido',
                style: 'tableHeader',
                rowSpan: 2,
            },
            {
                text: 'Telefono',
                style: 'tableHeader',
                rowSpan: 2,
            },
            ],
            [
                {}, {}, {}, {}, {}, {},
                {
                    text: 'Celular',
                    style: 'tableHeader',
                },
                {
                    text: 'Correo',
                    style: 'tableHeader',
                },
            ],
        ];
        const bodyTablaContactoEmpresa = registros
            .map((estudiante) => {
                const arregloPropiedades = Object.keys(estudiante);
                const columnasEstudiasteArreglo = [];
                arregloPropiedades
                    .map(propiedad => {
                        if (estudiante.codigo) {
                            columnasEstudiasteArreglo.push(
                                {
                                    text: estudiante.codigo
                                }
                            )
                        }
                        if (estudiante.cedula) {
                            columnasEstudiasteArreglo.push(
                                {
                                    text: estudiante.cedula
                                }
                            )
                        }
                        if (estudiante.nombre) {
                            columnasEstudiasteArreglo.push(
                                {
                                    text: estudiante.nombre
                                }
                            )
                        }
                        if (estudiante.apellido) {
                            columnasEstudiasteArreglo.push(
                                {
                                    text: estudiante.apellido
                                }
                            )
                        }
                        if (estudiante.telefono) {
                            columnasEstudiasteArreglo.push(
                                {
                                    text: estudiante.telefono
                                }
                            )
                        }
                        console.log('estas son las columnas', columnasEstudiasteArreglo);
                        return columnasEstudiasteArreglo;
                    });
                const estilos = {
                    tableExample: {
                        margin: [0, 5, 0, 15],
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 8,
                        color: 'black',
                        alignment: 'center',
                    },
                };
                const widths = ['15%', '15%', '15%', '15%', '15%'];
                return {
                    content: [
                        {
                            table: {
                                widths: [
                                    '30%', '70%',
                                ],
                                body: [
                                    [
                                        {
                                            image: __dirname + '/petro.jpeg',
                                            fit: [100, 100],
                                        },
                                        {
                                            text: 'Reporte de estudiantes', style: 'header',
                                        },
                                    ],
                                ],
                            },
                            layout: 'noBorders',
                        },
                        {
                            table: {
                                widths,
                                style: 'tableExample',
                                body: [
                                    ...titulosColumnas,
                                    ...bodyTablaContactoEmpresa,
                                ],
                            },
                            fontSize: 7,
                        },
                    ],
                    pageOrientation: 'landscape',
                    styles: estilos,
                };
            }
            )
    }

}
