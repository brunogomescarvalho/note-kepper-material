import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { AppMaterialModule } from 'src/app/shared/app-material/app-material.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    DashboardRoutes,

  ]
})
export class DashboardModule { }
