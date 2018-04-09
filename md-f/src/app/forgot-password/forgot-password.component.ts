import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  User : ResetFormDetails;
  constructor() { }

  ngOnInit() {
    this.User = {
      email : "",
      password : "",
      confirmpassword : ""
    }
  }
  resetform(User) {
    console.log(this.User)
    // this.User.email = undefined;
    // this.User.password = undefined;
    // this.User.confirmpassword = undefined;
  }
  password(text:any) {
    console.log('pasword', text)
  }  
}
interface ResetFormDetails {
  email : String;
  password : String;
  confirmpassword : String;
}
