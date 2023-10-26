import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { CategoriasService } from './services/categorias.service';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';




@NgModule({
  declarations: [
    ListarCategoriasComponent,
    InserirCategoriasComponent,
    EditarCategoriasComponent,

  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    SharedModule,
    CategoriasRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    CategoriasService
  ]
})
export class CategoriasModule { }
