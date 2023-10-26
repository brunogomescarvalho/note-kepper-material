import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/categoria';

@Injectable()
export class CategoriasService {

  endpoint: string = environment.API_URL + "/categoria"

  constructor(private httpService: HttpClient) { }

  public listarCategorias(): Observable<Categoria[]> {
    return this.httpService.get<Categoria[]>(this.endpoint)
  }

  public cadastrar(categoria: Categoria): Observable<Categoria> {
    return this.httpService.post<Categoria>(this.endpoint, categoria);
  }

  public buscarPorId(id: number): Observable<Categoria> {
    return this.httpService.get<Categoria>(`${this.endpoint}/${id}?_embed=nota`);
  }

  public excluir(id: number) {
    return this.httpService.delete<boolean>(`${this.endpoint}/${id}`);
  }

  public editar(categoria: Categoria) {
    return this.httpService.put<Categoria>(`${this.endpoint}/${categoria.id}`, categoria);
  }
}
