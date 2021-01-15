import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './utilities/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfigurationModule } from './configuration/configuration.module';
import {ConfigurationService} from './configuration/services/configuration.service';
import {OptionService} from './option/services/option.service';
import {ConfigurationCreateComponent} from './configuration/component/configuration-create/configuration-create.component';
import {HttpClientModule} from '@angular/common/http';
import {OptionCreateComponent} from './option/component/option-create/option-create.component';
import {OptionEditComponent} from './option/component/option-edit/option-edit.component';
import {ConfigurationEditComponent} from './configuration/component/configuration-edit/configuration-edit.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    MatNativeDateModule,
    ConfigurationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ConfigurationService, OptionService],
  bootstrap: [AppComponent],
  entryComponents: [ConfigurationCreateComponent, ConfigurationEditComponent, OptionCreateComponent, OptionEditComponent]
})
export class AppModule { }
