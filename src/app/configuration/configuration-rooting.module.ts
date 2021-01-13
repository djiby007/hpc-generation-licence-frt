import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigurationCreateComponent} from './component/configuration-create/configuration-create.component';
import {ConfigurationListComponent} from './component/configuration-list/configuration-list.component';
import {ConfigurationEditComponent} from './component/configuration-edit/configuration-edit.component';

const routes: Routes = [
  { path: 'create' , component: ConfigurationCreateComponent },
  { path: '' , component: ConfigurationListComponent },
  { path: 'edit/:id' , component: ConfigurationEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRootingModule { }
