import { Component, OnInit } from '@angular/core';
import { AssignService } from '../../shared/service/assign.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {EncrDecrServiceService} from '../../shared/service/encr-decr-service.service';
@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.scss']
})
export class LoginCompComponent implements OnInit {
  managers: { firstName: string; lastName: string; email: string; password: string; address: string; bdate: string; }[];
  isPwd: boolean = true;
  userLogin: FormGroup;
  userManager: FormGroup;
  aluse:string='';
  get l() {
    return this.userLogin.controls;
  }

  get c() {
    return this.userManager.controls;
  }
  constructor(private encService:EncrDecrServiceService,private modalService: NgbModal,private _service: AssignService, private fb: FormBuilder, private router: Router) {
    this.userLogin = this.fb.group({
      uname: ['', [Validators.required]],
      upass: ['', [Validators.required]]
    })

    this.userManager = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      bdate: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this._service.getManager().subscribe(res => {
      this.managers = res.map((sd) => {
        return ({ ...sd })
      });
      console.log("Available managers are ", this.managers)
    });
  }

  checkLogin() {
    const uname = this.userLogin.value.uname;
    const upass = this.userLogin.value.upass;
    console.log("Uname is ", uname, " pass is ", upass)
    var user1 = this.managers.find(res => res.email == uname);
    var decrypted = this.encService.get('123456$#@$^@1ERF', user1.password);
    console.log("decrypted  ",decrypted)
    var user = this.managers.find(res => res.email == uname && upass == decrypted);
    if (user) {
      console.log("Login...", user)
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/main']);

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'invalid details!',
      })
      this.userLogin.reset();
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     
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

  registerManager(){
    var encrypted = this.encService.set('123456$#@$^@1ERF', this.userManager.value.password);
    this.userManager.controls['password'].setValue(encrypted);
    var decrypted = this.encService.get('123456$#@$^@1ERF', encrypted);
    this._service.putManager(this.userManager.value).subscribe(() => {
      Swal.fire(
        'Success!',
        'Manager Added Successfully!',
        'success'
      )
      this.userManager.reset();
      this.fetchData();
      this.modalService.dismissAll();
    });
  }

  validEmail(email=''){
    console.log("VAlid or not")
    var tempel=this.userManager.value.email;
    var alreadyUse = this.managers.find(res => res.email == tempel);
    if(alreadyUse){
      this.aluse="This email is already register in system";
    }

  }

}
