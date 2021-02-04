import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import {CompanyListComponent} from './components/company-list/company-list.component';
import {CompanyCreateComponent} from './components/company-create/company-create.component';
import {CompanyEditComponent} from './components/company-edit/company-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {AppMaterialModule} from "../utilities/app-material/app-material.module";


@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyCreateComponent,

    CompanyEditComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    AppMaterialModule
  ]
})
export class CompanyModule { }
