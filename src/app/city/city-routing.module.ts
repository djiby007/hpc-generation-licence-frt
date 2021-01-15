import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityListComponent} from './components/city-list/city-list.component';
import {CityCreateComponent} from './components/city-create/city-create.component';
import {CityEditComponent} from './components/city-edit/city-edit.component';
import {CityDetailsComponent} from './components/city-details/city-details.component';


const routes: Routes = [
  {path: '', component: CityListComponent},
  {path: 'create', component: CityCreateComponent},
  {path: 'detail/:id', component: CityDetailsComponent},
  {path: 'edit/:id', component: CityEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
