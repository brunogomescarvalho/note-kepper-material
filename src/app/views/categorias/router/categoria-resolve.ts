import { inject } from "@angular/core"
import { ResolveFn, ActivatedRouteSnapshot } from "@angular/router"
import { Categoria } from "../model/categoria"
import { CategoriasService } from "../services/categorias.service"

export const selecionarTodasCategoriasResolve: ResolveFn<Categoria[]> = () => {
  return inject(CategoriasService).listarCategorias()
}

export const selecionarCategoriasPorIdResolve: ResolveFn<Categoria> = (route: ActivatedRouteSnapshot) => {
  const id = route.params['id']

  return inject(CategoriasService).buscarPorId(id)
}
