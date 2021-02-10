import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenceListComponent } from './components/licence-list/licence-list.component';
import { LicenceCreateComponent } from './components/licence-create/licence-create.component';
import { LicenceDetailsComponent } from './components/licence-details/licence-details.component';
import { LicenceEditComponent } from './components/licence-edit/licence-edit.component';

const routes: Routes = [
  {path: '', component: LicenceListComponent},
  {path: 'create', component: LicenceCreateComponent},
  {path: 'detail/:id', component: LicenceDetailsComponent},
  {path: 'edit/:id', component: LicenceEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenceRoutingModule { }
