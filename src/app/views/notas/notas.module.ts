import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { ListarNotasComponent } from './listar-notas/listar-notas.component';


@NgModule({
  declarations: [
    ListarNotasComponent
  ],
  imports: [
    CommonModule,
    NotasRoutingModule
  ]
})
export class NotasModule { }
