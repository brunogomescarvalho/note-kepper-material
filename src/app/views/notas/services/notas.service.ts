import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Nota } from '../model/Nota';

@Injectable()

export class NotasService {
  private url = `${environment.API_URL}/nota`

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

  public excluirNota(id: number) {
    return this.httpService.delete<Nota>(`${this.url}/${id}`)
  }

  public selecionarTodos(arquivado: boolean) {
    return this.httpService.get<Nota[]>(`${this.url}?arquivado=${arquivado}`)
  }

  public selecionarPorId(id: number): Observable<Nota> {
    return this.httpService.get<Nota>(`${this.url}/${id}?_expand=categoria`)
  }

  public buscarPorCategoria(idCategoria: number, arquivado: boolean) {
    return this.httpService.get<Nota[]>(`${this.url}?categoriaId=${idCategoria}&arquivado=${arquivado}`)
  }

  public buscarTodasPorCategoria(idCategoria: number): Observable<Nota[]> {
    return this.httpService.get<Nota[]>(`${this.url}?categoriaId=${idCategoria}`)
  }
}

