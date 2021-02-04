import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyListComponent} from './components/company-list/company-list.component';
import {CompanyCreateComponent} from './components/company-create/company-create.component';
import {CompanyEditComponent} from './components/company-edit/company-edit.component';


const routes: Routes = [
  {path: '', component: CompanyListComponent},
  {path: 'create', component: CompanyCreateComponent},
  {path: 'edit/:id', component: CompanyEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
