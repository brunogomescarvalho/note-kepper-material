import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/localStorageService';
import { UsuarioService } from './services/usuario.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],  providers: [LocalStorageService, UsuarioService, AuthService]
})
export class AuthModule { }
