import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PermissionListComponent} from './components/permission-list/permission-list.component';
import {PermissionEditComponent} from './components/permission-edit/permission-edit.component';

const routes: Routes = [
  { path: '' , component: PermissionListComponent },
  { path: 'edit/:id' , component: PermissionEditComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionRoutingModule { }
