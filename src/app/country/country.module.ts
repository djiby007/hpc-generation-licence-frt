import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import {CountryListComponent} from './components/country-list/country-list.component';
import {CountryCreateComponent} from './components/country-create/country-create.component';
import {CountryDetailsComponent} from './components/country-details/country-details.component';
import {CountryEditComponent} from './components/country-edit/country-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {AppMaterialModule} from "../utilities/app-material/app-material.module";


@NgModule({
  declarations: [
    CountryListComponent,
    CountryCreateComponent,
    CountryDetailsComponent,
    CountryEditComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    AppMaterialModule
  ]
})
export class CountryModule { }
