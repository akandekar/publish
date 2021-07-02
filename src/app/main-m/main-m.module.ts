import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMRoutingModule } from './main-m-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManagerComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    MainMRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainMModule { }
