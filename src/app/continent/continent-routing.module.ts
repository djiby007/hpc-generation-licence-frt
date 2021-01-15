import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContinentListComponent} from './components/continent-list/continent-list.component';


const routes: Routes = [
  {path: '', component: ContinentListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContinentRoutingModule { }
