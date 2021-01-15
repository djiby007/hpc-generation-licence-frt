import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then(c => c.ConfigurationModule) },
  { path: 'option',
    loadChildren: () => import('./option/option.module').then(o => o.OptionModule) },
  { path: 'continent',
    loadChildren: () => import('./continent/continent.module').then(c => c.ContinentModule) },
  { path: 'country',
    loadChildren: () => import('./country/country.module').then(c => c.CountryModule) },
  { path: 'city',
    loadChildren: () => import('./city/city.module').then(c => c.CityModule) },
  { path: 'company',
    loadChildren: () => import('./company/company.module').then(c => c.CompanyModule) },
  { path: 'filiale',
    loadChildren: () => import('./filiale/filiale.module').then(f => f.FilialeModule) },

  //{ path: '', redirectTo: '/continent' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
