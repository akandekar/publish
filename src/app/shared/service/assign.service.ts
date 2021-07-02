import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {employee} from '../model/employee';
import {manager} from '../model/manager';

@Injectable({
  providedIn: 'root'
})
export class AssignService {
  managerURL: string = "http://localhost:3000/manager";
  employeeURL:string="http://localhost:3000/employee";
  constructor(private _http:HttpClient) { }

  //Read
  getManager(){
    return this._http.get<manager[]>(this.managerURL);
  }
  getEmployee(){
    return this._http.get<employee[]>(this.employeeURL);
  }

  //Insert
   putManager(man:manager){
    return this._http.post(this.managerURL, man);
   }

   putEmployee(emp:employee){
    return this._http.post(this.employeeURL, emp);
  }

  //Update
  UpdateManager(bar: manager) {
    const apiURL = `${this.managerURL}/${bar.id}`;
    return this._http.put(apiURL, bar);
  }

  UpdateEmployee(em: manager) {
    console.log("em ",em)
    const apiURL = `${this.employeeURL}/${em.id}`;
    return this._http.put(apiURL, em);
  }

  //Delete
  deleteManager(id: number) {
    const apiURL = `${this.managerURL}/${id}`;
    return this._http.delete(apiURL);
  }

  deleteEmployee(id:number){
    const apiURL = `${this.employeeURL}/${id}`;
    return this._http.delete(apiURL);
  }
}
