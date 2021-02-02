import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApplicationListComponent} from "./component/application-list/application-list.component";
import {ApplicationCreateComponent} from "./component/application-create/application-create.component";
import {ApplicationEditComponent} from "./component/application-edit/application-edit.component";

const routes: Routes = [
  {path: '', component: ApplicationListComponent},
  {path: 'create', component: ApplicationCreateComponent},
  {path: 'edit/:id', component: ApplicationEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
