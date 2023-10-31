import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usuarioAutenticadoGuard, usuarioNaoAutenticadoGuard } from './core/auth/guards/usuario-guards';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'login',
    canActivate: [usuarioNaoAutenticadoGuard],
    loadChildren: () => import('./views/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [usuarioAutenticadoGuard]
  },

  {
    path: "categorias",
    canActivate: [usuarioAutenticadoGuard],
    loadChildren: () => import("./views/categorias/categorias.module")
      .then(c => c.CategoriasModule)
  },
  {
    path: "notas",
    canActivate: [usuarioAutenticadoGuard],
    loadChildren: () => import("./views/notas/notas.module")
      .then(n => n.NotasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
