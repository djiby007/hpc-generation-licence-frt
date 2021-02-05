import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppMaterialModule} from '../utilities/app-material/app-material.module';


@NgModule({
  declarations: [
    FeatureListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatureRoutingModule,
    AppMaterialModule
  ]
})
export class FeatureModule { }
