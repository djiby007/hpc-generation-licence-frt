import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './utilities/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfigurationModule } from './configuration/configuration.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ProfileModule,
    FeatureModule,
    AppRoutingModule,
    AppMaterialModule,
    MatNativeDateModule,
    ConfigurationModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PermissionModule,
    HttpClientModule,
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
