import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
/*
import {ApplicationCreateComponent} from './component/Application-create/Application-create.component';
import {ApplicationListComponent} from './component/Application-list/Application-list.component';
import {ApplicationEditComponent} from './component/Application-edit/Application-edit.component';
*/

const routes: Routes = [
 /* { path: 'create' , component: ApplicationCreateComponent },
  { path: '' , component: ApplicationListComponent },
  { path: 'edit/:id' , component: ApplicationEditComponent }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRootingModule { }
