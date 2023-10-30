import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/categoria';

@Injectable()
export class CategoriasService {

  endpoint: string = environment.API_URL + "/api/categorias"

  constructor(private httpService: HttpClient) { }

  public listarCategorias(): Observable<Categoria[]> {
    return this.httpService.get<any>(this.endpoint)
      .pipe(map((res) => res.dados))

  }

  public cadastrar(categoria: Categoria): Observable<Categoria> {
    return this.httpService.post<Categoria>(this.endpoint, categoria);
  }

  public buscarPorId(id: string): Observable<Categoria> {
    return this.httpService.get<any>(`${this.endpoint}/${id}`)
      .pipe(map((res) => res.dados));
  }

  public excluir(id: string) {
    return this.httpService.delete<any>(`${this.endpoint}/${id}`);
  }

  public editar(categoria: Categoria) {
    return this.httpService.put<any>(`${this.endpoint}/${categoria.id}`, categoria);
  }
}
