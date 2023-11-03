import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Nota } from '../model/Nota';
import { FiltroArquivadoEnum } from '../model/FiltroArquivadoEnum';

@Injectable()

export class NotasService {
  private url = `${environment.API_URL}/api/notas`

  constructor(private httpService: HttpClient) { }

  public criarNota(nota: Nota) {
    return this.httpService
      .post<Nota>(this.url, nota)
      .pipe(
        catchError(this.processarErro));

  }

  public editarNota(id: string, nota: Nota) {
    return this.httpService
      .put<Nota>(`${this.url}/${id}`, nota)
      .pipe(
        catchError(this.processarErro));

  }

  public arquivarNota(nota: Nota) {
    return this.httpService
      .put<Nota>(`${this.url}/arquivar/${nota.id}`, nota)
      .pipe(
        catchError(this.processarErro));

  }

  public excluirNota(id: string) {
    return this.httpService
      .delete<any>(`${this.url}/${id}`)
      .pipe(
        catchError(this.processarErro));

  }

  public selecionarTodos(arquivado: FiltroArquivadoEnum) {
    return this.httpService
      .get<any>(`${this.url}?filtroNotasEnum=${arquivado}`)
      .pipe(
        map(res => res.dados),
        catchError(this.processarErro))

  }

  public selecionarPorId(id: string): Observable<Nota> {
    return this.httpService
      .get<any>(`${this.url}/${id}`)
      .pipe(
        map(res => res.dados),
        catchError(this.processarErro))
  }

  public buscarPorCategoria(idCategoria: string, arquivado: FiltroArquivadoEnum) {
    return this.httpService
      .get<any>(`${this.url}/filtrarPorCategoria/${idCategoria}?filtroNotasEnum=${arquivado}`)
      .pipe(
        map(res => res.dados),
        catchError(this.processarErro))
  }

  public buscarTodasPorCategoria(idCategoria: string): Observable<Nota[]> {
    return this.httpService
      .get<any>(`${this.url}?categoriaId=${idCategoria}`)
      .pipe(
        map(res => res.dados),
        catchError(this.processarErro))
  }

  private processarErro(error: HttpErrorResponse): Observable<never> {
    const errorMessage = error.error.erro[0];
    return throwError(() => new Error(errorMessage));
  }

}




