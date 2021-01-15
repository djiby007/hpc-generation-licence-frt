import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import {CityListComponent} from './components/city-list/city-list.component';
import {CityCreateComponent} from './components/city-create/city-create.component';
import {CityDetailsComponent} from './components/city-details/city-details.component';
import {CityEditComponent} from './components/city-edit/city-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxCsvParserModule} from 'ngx-csv-parser';


@NgModule({
  declarations: [
    CityDetailsComponent,
    CityEditComponent,
    CityCreateComponent,
    CityListComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule
  ]
})
export class CityModule { }
