import { Component, OnInit } from '@angular/core';
import { UserActionsService } from '../user-actions.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  User : Logindetails;
  user_data: any;
  token: string;
  constructor( private useraction_service : UserActionsService,
    private router : Router) {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }

  ngOnInit() {
    this.User = {
      username : "",
      email : "",
      password : ""
    }
  }
  loginform(User) {
    this.useraction_service.user_action_url = 'http://localhost:3000/login/';
    this.useraction_service.data = this.User;
    this.useraction_service.post_method().subscribe(res => {
      this.user_data = res.json();
      if(this.user_data.status == 2 || this.user_data.status == 3) {
        Swal({
          text: 'Wrong Credentials',
          type: 'error'
        });
        this.User.username = "";
        this.User.email = "";
        this.User.password = "";
      } else {
        if(this.user_data.status == 4) {
          Swal({
            text: 'Email not verified',
            type: 'error'
          });
          this.User.username = "";
          this.User.email = "";
          this.User.password = "";
        } else {
          this.token = this.user_data.token;
          localStorage.setItem('currentUser', JSON.stringify({ username: this.user_data.username, token: this.user_data.token }));
          Swal({
            title: 'Welcome ' + this.user_data.username,
            text: 'Logged in Successfully, click OK to go to home page',
            type: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            this.router.navigate(['/main']);
          });
          }
      }
    },(error: any) => {
        console.log(error);
    }
  );
  }
}
interface Logindetails {
  username : String;
  email : String;
  password : String;
}