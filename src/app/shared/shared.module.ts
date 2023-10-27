import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './app-material/app-material.module';
import { DialogComponent } from './componentes/dialog/dialog.component';
import { CardHoverDirective } from './directives/card-hover-directve';
import { DialogService } from './services/dialog.service';

@NgModule({
  declarations: [
    CardHoverDirective,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  exports: [
    CommonModule,
    CardHoverDirective,
    DialogComponent,
    ReactiveFormsModule,
  ],
  providers: [DialogService]

})
export class SharedModule { }
