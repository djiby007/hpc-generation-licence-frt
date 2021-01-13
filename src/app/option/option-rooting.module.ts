import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OptionCreateComponent} from './component/option-create/option-create.component';
import {OptionListComponent} from './component/option-list/option-list.component';
import {OptionEditComponent} from './component/option-edit/option-edit.component';

const routes: Routes = [
  { path: 'create' , component: OptionCreateComponent },
  { path: '' , component: OptionListComponent },
  { path: 'edit/:id' , component: OptionEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionRootingModule { }
