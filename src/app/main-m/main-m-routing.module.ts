import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth/auth.guard';
import {EmployeeComponent} from './employee/employee.component';
import {ManagerComponent} from './manager/manager.component';
const routes: Routes = [
  {
    path:'employee',
    component:EmployeeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'',
    component:ManagerComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'manager',
    component:ManagerComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainMRoutingModule { }
