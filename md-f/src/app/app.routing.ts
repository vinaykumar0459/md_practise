import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegisterComponent } from './user-actions/register/register.component'

const appRoutes: Routes = [
  {
    path: '',
    loadChildren: './user-actions/user-actions.module#UserActionsModule'
  }
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   component : RegisterComponent
  // }
];

export const appRoutingProviders: any[] = [];
export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);