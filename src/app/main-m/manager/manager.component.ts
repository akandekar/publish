import { Component, OnInit } from '@angular/core';
import { AssignService } from '../../shared/service/assign.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  employee: { firstName: string; lastName: string; mobile: number; city: string; address: string; bdate: string; }[];
  currentuser: any;
  searchText: string = "";
  p: number = 1;
  perPage: number = 5;
  closeResult = '';
  userThing: FormGroup;
  action: string = ''
  get l() {
    return this.userThing.controls;
  }
  constructor(private _service: AssignService, private fb: FormBuilder, private router: Router, private modalService: NgbModal) {
    this.userThing = this.fb.group({
      id:[''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      bdate: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._service.getEmployee().subscribe(res => {
      this.employee = res.map((sd) => {
        return ({ ...sd })
      });
      console.log("Employees are ", this.employee)
      this.currentuser = JSON.parse(localStorage.getItem('user'));
      console.log("this.currentuser  ", this.currentuser);
    });
  }

  resetPageNo() {
    this.p = 1;
  }
  deleteProduct(p) {

  }

  open(content, actionIS = '', idf = null) {
    console.log("actionIS ", actionIS, "  idf  ", idf)
    this.action = actionIS;
    if (actionIS == 'Update' && idf) {
      this.userThing.controls['id'].setValue(idf.id);
      this.userThing.controls['firstName'].setValue(idf.firstName);
      this.userThing.controls['lastName'].setValue(idf.lastName);
      this.userThing.controls['mobile'].setValue(idf.mobile);
      this.userThing.controls['city'].setValue(idf.city);
      this.userThing.controls['address'].setValue(idf.address);
      this.userThing.controls['bdate'].setValue(idf.bdate);
    } else {
      this.userThing.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  modelAction(msg = 0) {
    if (msg != 0) {
      this.action = 'Delete Employee';
    }
    console.log("this action is  ", this.action);
    if (this.action == "Add Employee") {
      this._service.putEmployee(this.userThing.value).subscribe(() => {
        Swal.fire(
          'Success!',
          'Employee Added Successfully!',
          'success'
        )
        this.userThing.reset();
        this.fetchData();
      });
      this.action = "";
    } else if (this.action == "Delete Employee") {
      if (confirm("Are you sure want to delete Employee record ?")) {
        this._service.deleteEmployee(msg).subscribe(()=>{
          Swal.fire(
            'Deleted!',
            'Employee record deleted',
            'success'
          )
          this.fetchData();
        });
      }
    }
    else {
      this._service.UpdateEmployee(this.userThing.value).subscribe(() => {
        Swal.fire(
          'Success!',
          'Employee record updated Successfully!',
          'success'
        )
        this.userThing.reset();
        this.fetchData();
      });

    }
    this.modalService.dismissAll();
  }

  logout(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You have to login again once you logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      }
    })
    
  }

}
