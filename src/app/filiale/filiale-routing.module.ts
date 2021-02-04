import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilialeListComponent} from "./components/filiale-list/filiale-list.component";
import {FilialeCreateComponent} from "./components/filiale-create/filiale-create.component";
import {FilialeEditComponent} from "./components/filiale-edit/filiale-edit.component";


const routes: Routes = [
  {path: '', component: FilialeListComponent},
  {path: 'create', component: FilialeCreateComponent},
  {path: 'edit/:id', component: FilialeEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilialeRoutingModule { }
