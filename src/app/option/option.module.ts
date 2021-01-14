import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OptionCreateComponent} from './component/option-create/option-create.component';
import {OptionEditComponent} from './component/option-edit/option-edit.component';
import {OptionListComponent} from './component/option-list/option-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OptionRootingModule} from './option-rooting.module';
import {AppMaterialModule} from "../utilities/app-material/app-material.module";


@NgModule({
  declarations: [
    OptionCreateComponent,
    OptionEditComponent,
    OptionListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OptionRootingModule,
    AppMaterialModule

  ]
})
export class OptionModule { }
