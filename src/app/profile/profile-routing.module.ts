import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileCreateComponent} from './components/profile-create/profile-create.component';
import {ProfileEditComponent} from './components/profile-edit/profile-edit.component';
import {ProfileListComponent} from './components/profile-list/profile-list.component';


const routes: Routes = [
  { path: 'create' , component: ProfileCreateComponent },
  { path: '' , component: ProfileListComponent },
  { path: 'edit/:id' , component: ProfileEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
