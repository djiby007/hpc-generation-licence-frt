import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompanyListComponent} from './components/company-list/company-list.component';
import {CompanyCreateComponent} from './components/company-create/company-create.component';
import {CompanyDetailsComponent} from './components/company-details/company-details.component';
import {CompanyEditComponent} from './components/company-edit/company-edit.component';


const routes: Routes = [
  {path: '', component: CompanyListComponent},
  {path: 'create', component: CompanyCreateComponent},
  {path: 'detail/:id', component: CompanyDetailsComponent},
  {path: 'edit/:id', component: CompanyEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
