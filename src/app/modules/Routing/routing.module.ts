import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../Authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../Authentication/authentication.module').then( mod => mod.AuthenticationModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('../Dashboard/dashboard.module').then( mod => mod.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
