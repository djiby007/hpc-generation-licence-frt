import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilialeCreateComponent} from "./components/filiale-create/filiale-create.component";
import {FilialeEditComponent} from "./components/filiale-edit/filiale-edit.component";
import {FilialeDetailsComponent} from "./components/filiale-details/filiale-details.component";
import {FilialeListComponent} from "./components/filiale-list/filiale-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxCsvParserModule} from "ngx-csv-parser";
import {FilialeRoutingModule} from "./filiale-routing.module";



@NgModule({
  declarations: [
    FilialeCreateComponent,
    FilialeEditComponent,
    FilialeDetailsComponent,
    FilialeListComponent
  ],
  imports: [
    CommonModule,
    FilialeRoutingModule,
    ReactiveFormsModule,
    NgxCsvParserModule
  ]
})
export class FilialeModule { }
