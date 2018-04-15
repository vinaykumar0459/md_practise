import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserActionsService } from '../user-actions.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  today = new Date();
  minDate = new Date(1920, 0, 1);
  maxDate = this.today;
  User : RegisterUserDetails;
  user_data: any;
  constructor( private useraction_service : UserActionsService,
  private router : Router) { }

  ngOnInit() {
    this.User = {
      username : "",
      email : "",
      password : "",
      confirmpassword : "",
      dateofbirth : "",
      gender : ""
    }
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register_body');
  }
  // ngOnInit(): void {
    
  // }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register_body');
  }
  registerform(User) {
    this.useraction_service.user_action_url = 'http://localhost:3000/register/';
    this.useraction_service.data = this.User;
    this.useraction_service.post_method().subscribe(res => {
      this.user_data = res.json();
      if(this.user_data.status == 1) {
        Swal({
          text: 'Username already exists, try with another Username',
          type: 'error'
        });
        this.User.password = "";
        this.User.confirmpassword = "";
      } else if(this.user_data.status == 2){
        Swal({
          text: 'Email already exists, try with another Email',
          type: 'error'
        });
        this.User.password = "";
        this.User.confirmpassword = "";
      } else {
        Swal({
          text: 'Dear ' + this.user_data.username+', Please verify your Email ID',
          type: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          this.router.navigate(['/login']);
        });
      }
    },(error: any) => {
        console.log(error);
    }
  );
  }
}
interface RegisterUserDetails {
  username : String;
  email : String;
  password : String;
  confirmpassword : String;
  dateofbirth : String;
  gender : String;
}