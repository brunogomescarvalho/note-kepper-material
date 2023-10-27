import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotasRoutingModule } from './notas-routing.module';
import { ListarNotasComponent } from './listar-notas/listar-notas.component';
import { NotasService } from './services/notas.service';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { FormComponent } from './componentes/form/form.component';
import { InserirNotasComponent } from './inserir-notas/inserir-notas.component';
import { CategoriasService } from '../categorias/services/categorias.service';
import { EditarNotasComponent } from './editar-notas/editar-notas.component';


@NgModule({
  declarations: [
    ListarNotasComponent,
    FormComponent,
    InserirNotasComponent,
    EditarNotasComponent
  ],
  imports: [
    CommonModule,
    NotasRoutingModule,
    AppMaterialModule,
    SharedModule
  ],
  providers:[
    NotasService,
    CategoriasService
  ]
})
export class NotasModule { }
