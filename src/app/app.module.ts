import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './utilities/app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ConfigurationModule } from './configuration/configuration.module';
import {ProfileModule} from "./profile/profile.module";
import {FeatureModule} from "./feature/feature.module";
import {PermissionModule} from "./permission/permission.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ContinentModule} from "./continent/continent.module";
import {CountryModule} from "./country/country.module";
import {CityModule} from "./city/city.module";
import {CompanyModule} from "./company/company.module";
import {FilialeModule} from "./filiale/filiale.module";
import {NavbarComponent} from "./menu/navbar/navbar.component";
import {XhrInterceptorInterceptor} from "./utilities/Interceptor/xhr-interceptor.interceptor";
import {PermissionListComponent} from "./permission/components/permission-list/permission-list.component";
import {AuthService} from "./authentication/services/auth.service";
import {ApplicationModule} from "./application/application.module";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
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
    ContinentModule,
    CountryModule,
    CityModule,
    CompanyModule,
    FilialeModule,
    ApplicationModule
  ],
  providers: [
    PermissionListComponent, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: XhrInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
