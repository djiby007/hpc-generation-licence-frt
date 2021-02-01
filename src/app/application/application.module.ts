import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import {ApplicationListComponent} from "./component/application-list/application-list.component";
import {ApplicationEditComponent} from "./component/application-edit/application-edit.component";
import {ApplicationCreateComponent} from "./component/application-create/application-create.component";
import {AppMaterialModule} from "../utilities/app-material/app-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ApplicationListComponent,
    ApplicationEditComponent,
    ApplicationCreateComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class ApplicationModule { }
