import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then(c => c.ConfigurationModule) },
  { path: '',
    loadChildren: () => import('./option/option.module').then(o => o.OptionModule) },

  { path: 'home', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
