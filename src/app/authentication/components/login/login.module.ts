import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdadePasswordComponent} from '../updade-password/updade-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UpdadePasswordComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }