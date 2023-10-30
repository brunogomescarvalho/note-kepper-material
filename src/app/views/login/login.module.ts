import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';
import { LoginRouterModule } from './login-router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
   LoginRouterModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ]

})
export class LoginModule { }
