import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverDirective } from './directives/card-hover-directve';



@NgModule({
  declarations: [CardHoverDirective],
  imports: [
    CommonModule
  ],
  exports:[CardHoverDirective]
})
export class SharedModule { }
