import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputCantidadComponent} from './input-cantidad/input-cantidad.component';
import {MatInputModule} from '@angular/material/input';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [InputCantidadComponent],
  imports: [
    CommonModule,
    MatInputModule,
    TextMaskModule,
    FormsModule,
  ],
  exports: [
    InputCantidadComponent
  ]
})
export class InputCantidadModule {
}
