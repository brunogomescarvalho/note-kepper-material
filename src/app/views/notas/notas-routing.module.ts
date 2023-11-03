import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';

import { selecionarTodasCategoriasResolve } from '../categorias/router/categoria-resolve';
import { EditarNotasComponent } from './editar-notas/editar-notas.component';
import { InserirNotasComponent } from './inserir-notas/inserir-notas.component';
import { ListarNotasComponent } from './listar-notas/listar-notas.component';
import { Nota } from './model/Nota';
import { NotasService } from './services/notas.service';
import { FiltroArquivadoEnum } from './model/FiltroArquivadoEnum';

export const selecionarNotasResolve: ResolveFn<Nota[]> = () => {
  return inject(NotasService).selecionarTodos(FiltroArquivadoEnum.Nao_arquivados)
}

export const selecionarNotaPoIdResolve: ResolveFn<Nota> = (route: ActivatedRouteSnapshot) => {
  const id =(route.paramMap.get('id')!)
  return inject(NotasService).selecionarPorId(id)
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: "full"
  },

  {
    path: 'listar',
    component: ListarNotasComponent,
    resolve: { notas: selecionarNotasResolve, categorias: selecionarTodasCategoriasResolve, }
  },
  {
    path: 'inserir',
    component: InserirNotasComponent,
    resolve: { categorias: selecionarTodasCategoriasResolve }
  },
  {
    path: 'editar/:id',
    component: EditarNotasComponent,
    resolve: { nota: selecionarNotaPoIdResolve, categorias: selecionarTodasCategoriasResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotasRoutingModule { }
