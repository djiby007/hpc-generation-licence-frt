import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CountryListComponent} from './components/country-list/country-list.component';
import {CountryCreateComponent} from './components/country-create/country-create.component';
import {CountryDetailsComponent} from './components/country-details/country-details.component';
import {CountryEditComponent} from './components/country-edit/country-edit.component';


const routes: Routes = [
  {path: '', component: CountryListComponent},
  {path: 'detail/:id', component: CountryDetailsComponent },
  {path: 'create', component: CountryCreateComponent },
  {path: 'edit/:id', component: CountryEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
