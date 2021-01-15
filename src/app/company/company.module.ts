import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import {CompanyListComponent} from './components/company-list/company-list.component';
import {CompanyCreateComponent} from './components/company-create/company-create.component';
import {CompanyDetailsComponent} from './components/company-details/company-details.component';
import {CompanyEditComponent} from './components/company-edit/company-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxCsvParserModule} from 'ngx-csv-parser';


@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyCreateComponent,
    CompanyDetailsComponent,
    CompanyEditComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule
  ]
})
export class CompanyModule { }
