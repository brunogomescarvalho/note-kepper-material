import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, Observable, throwError } from 'rxjs';

import { LocalStorageService } from './localStorageService';
import { UsuarioService } from './usuario.service';

import { LoginUsuarioViewModel } from 'src/app/views/login/models/formLoginViewModel';
import { FormRegistroUsuarioViewModel } from 'src/app/views/login/models/formUsuarioViewModel';

@Injectable()
export class AuthService {

  private endpoint: string = 'https://localhost:7108/api/conta/'
  constructor(
    private httpService: HttpClient,
    private localStorage: LocalStorageService,
    private usuarioService: UsuarioService) { }

  public registrar(usuario: FormRegistroUsuarioViewModel) {
    return this.httpService.post(this.endpoint + 'registrar', usuario)
      .pipe(
        tap((res: any) => {
          if (res.sucesso == true) {
            this.localStorage.salvarToken(res)
          }
        }),
        catchError((err: HttpErrorResponse) =>
          this.processarErro(err)
        ))

  }

  public autenticar(usuario: LoginUsuarioViewModel) {

    console.log(usuario)
    return this.httpService.post(this.endpoint + 'autenticar', usuario)
      .pipe(
        tap((res: any) => {

          console.log(res)
          if (res.sucesso == true) {
            this.localStorage.salvarToken(res)
          }
        }),
        catchError((err: HttpErrorResponse) =>
          this.processarErro(err)
        ))
  }

  public logout(): Observable<any> {
    return this.httpService
      .post<any>(this.endpoint + 'sair', {})
      .pipe(
        tap(() => this.usuarioService.logoutUsuario()),
        tap(() => this.localStorage.limparDadosLocais())
      );
  }

  private processarErro(err: HttpErrorResponse): any {
    if (err.status == 400)
      return throwError(() => new Error("Verifique o e-mail e a senha ou efetue seu cadastro"))
    return throwError(() => {
      console.log(err)
      new Error('Ocorreu um erro ao efetuar sua solicitação, tente novamente mais tarde')
    })
  }
}
