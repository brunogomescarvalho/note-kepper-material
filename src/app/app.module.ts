import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { provideHttpClient } from '@angular/common/http';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TemaService } from './shared/services/tema.service';

export function atribuirTemaUsuarioFactory(temaService: TemaService) {
  return () => temaService.obterTemaUsuario()
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
  providers: [provideHttpClient(),
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 4500 } },
  {
    provide: APP_INITIALIZER,
    useFactory: atribuirTemaUsuarioFactory,
    deps: [TemaService],
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
