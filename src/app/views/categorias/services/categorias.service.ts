import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Categoria } from '../model/categoria';

@Injectable()

export class CategoriasService {
  private endpoint: string = `${environment.API_URL}/api/categorias`;

  constructor(private httpService: HttpClient) { }

  listarCategorias(): Observable<Categoria[]> {
    return this.httpService
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res.dados),
        catchError(this.processarErro)
      );
  }

  cadastrar(categoria: Categoria): Observable<Categoria> {
    return this.httpService
      .post<Categoria>(this.endpoint, categoria)
      .pipe(catchError(this.processarErro));
  }

  buscarPorId(id: string): Observable<Categoria> {
    const url = `${this.endpoint}/${id}`;
    return this.httpService
      .get<any>(url)
      .pipe(catchError(this.processarErro));
  }

  excluir(id: string) {
    const url = `${this.endpoint}/${id}`;
    return this.httpService
      .delete<any>(url)
      .pipe(catchError(this.processarErro));
  }

  editar(categoria: Categoria) {
    const url = `${this.endpoint}/${categoria.id}`;
    return this.httpService
      .put<any>(url, categoria)
      .pipe(catchError(this.processarErro));
  }

  private processarErro(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error.erro[0];
    return throwError(() => new Error(errorMessage));
  }
}
