import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenceCreateComponent } from './components/licence-create/licence-create.component';
import { LicenceDetailsComponent } from './components/licence-details/licence-details.component';
import { LicenceEditComponent } from './components/licence-edit/licence-edit.component';
import { LicenceListComponent } from './components/licence-list/licence-list.component';
import { LicenceRoutingModule } from './licence-routing.module';
import {AppMaterialModule} from '../utilities/app-material/app-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    LicenceCreateComponent,
    LicenceDetailsComponent,
    LicenceEditComponent,
    LicenceListComponent
  ],
    imports: [
        CommonModule,
        LicenceRoutingModule,
        AppMaterialModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class LicenceModule { }
