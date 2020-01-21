import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListboxParticipantesComponent } from './listbox-participantes/listbox-participantes.component';
import {ListboxModule} from 'primeng/listbox';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [ListboxParticipantesComponent],
  imports: [
    CommonModule,
    ListboxModule,
    FormsModule
  ],
  exports: [
    ListboxParticipantesComponent
  ]
})
export class ListboxParticipantesModule { }
