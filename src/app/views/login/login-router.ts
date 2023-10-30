import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { usuarioNaoAutenticadoGuard } from "src/app/core/auth/guards/usuario-guards";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
      path: '',
      component: LoginComponent,
     canActivate: [usuarioNaoAutenticadoGuard]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})

export class LoginRouterModule {

}
