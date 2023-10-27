import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditarCategoriasComponent } from '../editar-categorias/editar-categorias.component';
import { InserirCategoriasComponent } from '../inserir-categorias/inserir-categorias.component';
import { ListarCategoriasComponent } from '../listar-categorias/listar-categorias.component';
import { selecionarCategoriasPorIdResolve, selecionarTodasCategoriasResolve } from './categoria-resolve';



const routes: Routes = [
  {
    path: "",
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ListarCategoriasComponent,
    resolve: { categorias: selecionarTodasCategoriasResolve }
  },
  {
    path: 'inserir',
    component: InserirCategoriasComponent
  },
  {
    path: 'editar/:id',
    component: EditarCategoriasComponent,
    resolve: { categoria: selecionarCategoriasPorIdResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
