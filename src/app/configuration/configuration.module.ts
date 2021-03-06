import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRootingModule } from './configuration-rooting.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfigurationCreateComponent} from './component/configuration-create/configuration-create.component';
import {ConfigurationEditComponent} from './component/configuration-edit/configuration-edit.component';
import {ConfigurationListComponent} from './component/configuration-list/configuration-list.component';
import {AppMaterialModule} from '../utilities/app-material/app-material.module';

@NgModule({
  declarations: [
    ConfigurationCreateComponent,
    ConfigurationEditComponent,
    ConfigurationListComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ConfigurationRootingModule,
        AppMaterialModule
    ]
})
export class ConfigurationModule { }
