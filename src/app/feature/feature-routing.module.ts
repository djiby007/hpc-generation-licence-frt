import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureListComponent } from './components/feature-list/feature-list.component';

const routes: Routes = [
  { path: '' , component: FeatureListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
