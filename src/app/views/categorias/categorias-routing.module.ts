import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';

import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { Categoria } from './model/categoria';
import { CategoriasService } from './services/categorias.service';
import { InserirCategoriasComponent } from './inserir-categorias/inserir-categorias.component';
import { EditarCategoriasComponent } from './editar-categorias/editar-categorias.component';

export const selecionarTodasCategoriasResolve: ResolveFn<Categoria[]> = () => {
  return inject(CategoriasService).listarCategorias()
}

export const selecionarCategoriasPorIdResolve: ResolveFn<Categoria> = (route: ActivatedRouteSnapshot) => {
  const id = parseInt(route.params['id'])

  return inject(CategoriasService).buscarPorId(id)
}


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
