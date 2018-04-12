import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserActionsComponent } from './user-actions.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const useractionsRoutes: Routes = [
  { path:'', pathMatch:'full', redirectTo:'signup'},
  {
    path: '',
    component : UserActionsComponent,
    children: [
      {
        path: 'signup',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'reset',
        component: ForgotPasswordComponent
      }
    ]
  }
  
];
@NgModule ( {
    imports : [ RouterModule.forChild ( useractionsRoutes) ],
    exports : [ RouterModule ],
} )

export class UserActionsRouting {
}