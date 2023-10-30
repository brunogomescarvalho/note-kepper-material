import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";

export const usuarioAutenticadoGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const usuarioService = inject(UsuarioService);

  if (!usuarioService.tokenValido()) {

   // inject(ToastrService).warning('Usuário não autenticado. Efetue login.');

    usuarioService.logoutUsuario();

    inject(Router).navigate(['/login']);

    return false;
  }

  return true;
};


export const usuarioNaoAutenticadoGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const usuarioService = inject(UsuarioService);

  if (usuarioService.tokenValido()) {

   // inject(ToastrService).warning('Usuário já autenticado.');

    inject(Router).navigate(['/dashboard']);

    return false;
  }

  return true;
};
