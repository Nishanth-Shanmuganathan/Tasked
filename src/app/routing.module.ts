import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainListComponent } from './main-list/main-list.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuard } from './services/login.gaurd';

const routes: Routes = [
  { path: '', component: MainListComponent, canActivate: [LoginGuard] },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', component: LoginComponent, },
      { path: 'register', component: RegisterComponent },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class RoutingModule { }
