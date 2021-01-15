import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './utilities/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfigurationModule } from './configuration/configuration.module';
import {ContinentModule} from "./continent/continent.module";
import {HttpClientModule} from "@angular/common/http";
import {CountryModule} from "./country/country.module";
import {CityModule} from "./city/city.module";
import {CompanyModule} from "./company/company.module";
import {FilialeModule} from "./filiale/filiale.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    MatNativeDateModule,
    ConfigurationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ContinentModule,
    CountryModule,
    CityModule,
    CompanyModule,
    FilialeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
