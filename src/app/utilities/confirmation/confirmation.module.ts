import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';

@NgModule({
  declarations: [
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class ConfirmationModule { }
