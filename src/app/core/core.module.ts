import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from './shell/shell.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { TemaService } from '../shared/services/tema.service';
import { UsuarioService } from './auth/services/usuario.service';
import { AuthModule } from './auth/auth.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule,
    ShellModule,
    AuthModule
  ],
  exports:[
    ShellModule,
    AuthModule,
  // ],
  // providers:[
  //   TemaService,
  //   UsuarioService
   ]
})
export class CoreModule { }
