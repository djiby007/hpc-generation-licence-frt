import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {ForgotPasswordComponent} from '../forgot-password/forgot-password.component';
import {ResetPasswordComponent} from '../reset-password/reset-password.component';
import {UpdadePasswordComponent} from '../updade-password/updade-password.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'updatepassword', component: UpdadePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
