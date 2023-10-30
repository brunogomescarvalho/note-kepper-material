import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { LocalStorageService } from "../services/localStorageService";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

export const interceptorToken = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const token = inject(LocalStorageService).obterUsuarioLogado()

  if (!token)
    return next(request);

  if (!inject(UsuarioService).tokenValido()) {

    inject(Router).navigate(['/login'])

    return next(request);
  }

  const req = request.clone({

    headers: request.headers.set('Authorization', `Bearer ${token.chave}`),
  })

  return next(req);
}
