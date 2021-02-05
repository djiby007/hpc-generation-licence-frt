import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdadePasswordComponent} from '../updade-password/updade-password.component';
import {AppMaterialModule} from '../../../utilities/app-material/app-material.module';


@NgModule({
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        UpdadePasswordComponent
    ],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        AppMaterialModule
    ]
})
export class LoginModule { }
