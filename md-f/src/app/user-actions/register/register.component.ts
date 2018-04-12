import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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
  constructor() { }

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
    console.log(this.User)
    // this.User.username = undefined;
    // this.User.email = undefined;
    // this.User.password = undefined;
    // this.User.confirmpassword = undefined;
    // this.User.dateofbirth = undefined;
    // this.User.gender = undefined;
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