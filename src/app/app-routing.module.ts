import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './utilities/Guard/auth-guard.service';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./authentication/components/login/login.module').then(m => m.LoginModule) },

  { path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then(t => t.ConfigurationModule), canActivate : [AuthGuardService] },
  { path: 'option',
    loadChildren: () => import('./option/option.module').then(o => o.OptionModule), canActivate : [AuthGuardService] },
  { path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(r => r.FeatureModule), canActivate : [AuthGuardService] },
  { path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(p => p.ProfileModule), canActivate : [AuthGuardService] },
  { path: 'permission',
    loadChildren: () => import('./permission/permission.module').then(a => a.PermissionModule), canActivate : [AuthGuardService] },
  { path: 'continent',
    loadChildren: () => import('./continent/continent.module').then(c => c.ContinentModule), canActivate : [AuthGuardService] },
  { path: 'country',
    loadChildren: () => import('./country/country.module').then(c => c.CountryModule), canActivate : [AuthGuardService] },
  { path: 'city',
    loadChildren: () => import('./city/city.module').then(c => c.CityModule), canActivate : [AuthGuardService] },
  { path: 'company',
    loadChildren: () => import('./company/company.module').then(c => c.CompanyModule), canActivate : [AuthGuardService] },
  { path: 'filiale',
    loadChildren: () => import('./filiale/filiale.module').then(f => f.FilialeModule), canActivate : [AuthGuardService] },
  { path: 'licence',
    loadChildren: () => import('./licence/licence.module').then(l => l.LicenceModule), canActivate : [AuthGuardService] },

  { path: 'home', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
