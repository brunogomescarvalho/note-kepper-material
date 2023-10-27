import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellModule } from './shell/shell.module';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { TemaService } from '../shared/services/tema.service';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule,
    ShellModule,
  ],
  exports:[
    ShellModule
  ],
  providers:[TemaService]
})
export class CoreModule { }
