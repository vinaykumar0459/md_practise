import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  User : Logindetails;
  constructor() { }

  ngOnInit() {
    this.User = {
      username : "",
      email : "",
      password : ""
    }
  }
  loginform(User) {
    console.log(this.User)
    // this.User.email = undefined;
    // this.User.password = undefined;
  }
}
interface Logindetails {
  username : String;
  email : String;
  password : String;
}