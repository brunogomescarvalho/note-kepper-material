import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Nota } from '../model/Nota';

@Injectable()

export class NotasService {
  private url = `${environment.API_URL}/api/notas`

  constructor(private httpService: HttpClient) { }


  public criarNota(nota: Nota) {
    return this.httpService.post<Nota>(this.url, nota)
  }

  public editarNota(id: string, nota: Nota) {
    return this.httpService.put<Nota>(`${this.url}/${id}`, nota)
  }

  public arquivarNota(nota: Nota) {
    return this.httpService.patch<Nota>(`${this.url}/${nota.id}`, nota)
  }

  public excluirNota(id: string) {
    return this.httpService.delete<any>(`${this.url}/${id}`)
  }

  public selecionarTodos(arquivado: FiltroArquivadoEnum) {
    return this.httpService.get<any>(`${this.url}?filtroNotasEnum=${arquivado}`)
      .pipe(map(res => res.dados))

  }

  public selecionarPorId(id: string): Observable<Nota> {
    return this.httpService.get<any>(`${this.url}/${id}`)
      .pipe(map(res => res.dados))
  }

  public buscarPorCategoria(idCategoria: string, arquivado: FiltroArquivadoEnum) {
    return this.httpService.get<any>(`${this.url}/filtrarPorCategoria/${idCategoria}?filtroNotasEnum=${arquivado}`)
      .pipe(map(res => res.dados))
  }

  public buscarTodasPorCategoria(idCategoria: string): Observable<Nota[]> {
    return this.httpService.get<any>(`${this.url}?categoriaId=${idCategoria}`)
      .pipe(map(res => res.dados))
  }

}

export enum FiltroArquivadoEnum {
  Todos, Arquivados, Nao_arquivados
}

