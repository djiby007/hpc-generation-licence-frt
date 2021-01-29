import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*import {ApplicationListComponent} from "./component/application-list/application-list.component";
import {ApplicationEditComponent} from "./component/application-edit/application-edit.component";
import {ApplicationCreateComponent} from "./component/application-create/application-create.component";*/
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApplicationRootingModule} from "./application-rooting.module";



@NgModule({
  declarations: [
    /*ApplicationListComponent,
    ApplicationEditComponent,
    ApplicationCreateComponent*/
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //AppMaterialModule,
    ApplicationRootingModule
  ]
})
export class ApplicationModule { }
