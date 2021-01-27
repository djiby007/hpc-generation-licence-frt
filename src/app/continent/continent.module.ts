import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContinentRoutingModule } from './continent-routing.module';
import {ContinentListComponent} from './components/continent-list/continent-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {AppMaterialModule} from "../utilities/app-material/app-material.module";


@NgModule({
  declarations: [
    ContinentListComponent,
  ],
  imports: [
    CommonModule,
    ContinentRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule,
    AppMaterialModule
  ]
})
export class ContinentModule { }
