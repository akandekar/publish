import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainMModule} from './main-m/main-m.module';
import {LoginModule} from './login/login.module';
import {AuthGuard} from './shared/auth/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren:'./login/login.module#LoginModule',
    // canActivate:[AuthGuard]
  },
  {
    path:'login',
    loadChildren:'./login/login.module#LoginModule',
    canActivate:[AuthGuard]
  },
  {
    path:'main',
    loadChildren:'./main-m/main-m.module#MainMModule',
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
