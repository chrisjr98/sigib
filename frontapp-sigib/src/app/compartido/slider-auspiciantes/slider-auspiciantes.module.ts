import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderAuspiciantesComponent } from './slider-auspiciantes/slider-auspiciantes.component';
import {GalleriaModule} from 'primeng/galleria';
import {MatProgressBarModule} from '@angular/material';



@NgModule({
  declarations: [SliderAuspiciantesComponent],
  imports: [
    CommonModule,
    GalleriaModule,
    MatProgressBarModule,
  ],
  exports: [
    SliderAuspiciantesComponent,
  ]
})
export class SliderAuspiciantesModule { }
