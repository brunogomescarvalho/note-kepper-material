import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TemaService } from './shared/services/tema.service';
import { interceptorToken } from './core/auth/interceptors/token-interceptor';

import { LoadingService } from './shared/loading/loadingService';
import { UsuarioService } from './core/auth/services/usuario.service';
import { interceptorLoading } from './shared/loading/interceptor-loading';

export function atribuirTemaUsuarioFactory(temaService: TemaService) {
  return () => temaService.obterTemaUsuario()
}

export function logarUsuarioSalvoFactory(usuarioService: UsuarioService) {
  return () => usuarioService.logarUsuarioSalvo()
}

@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    DashboardModule,
  ],
  providers: [provideHttpClient(withInterceptors([interceptorToken, interceptorLoading])),

  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4500 } },
  {
    provide: APP_INITIALIZER,
    useFactory: logarUsuarioSalvoFactory,
    deps: [UsuarioService],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: atribuirTemaUsuarioFactory,
    deps: [TemaService],
    multi: true
  },
  LoadingService,
  TemaService],


  bootstrap: [AppComponent]
})
export class AppModule { }
