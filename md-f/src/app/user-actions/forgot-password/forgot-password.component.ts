import { Component, OnInit } from '@angular/core';
import { UserActionsService } from '../user-actions.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  User : ResetFormDetails;
  user_data : any;
  user_emailid : boolean = true;
  user_pass : boolean = false;
  constructor(private useraction_service : UserActionsService,
    private router : Router) { }

  ngOnInit() {
    this.User = {
      email : "",
      password : "",
      confirmpassword : ""
    }
    if (window.location.href.indexOf('reset') > 0) {
      this.user_emailid = false;
      this.user_pass = true;
    } else {
      this.user_emailid = true;
      this.user_pass = false;
    }
  }
  resetformemail(User) {
    this.useraction_service.user_action_url = 'http://localhost:3000/forgotpassword';
    this.useraction_service.data = this.User;
    this.useraction_service.post_method().subscribe(res => {
      this.user_data = res.json();
      if(this.user_data.status == 1) {
        Swal({
          text: 'Reset password link sent to mail',
          type: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          this.router.navigate(['/login']);
        });
      } else {
          Swal({
            text: 'Failed to connect server, try again later',
            type: 'error'
          });
      }
    },(error: any) => {
        console.log(error);
    });
  }
  resetformpass(User) {
    this.useraction_service.user_action_url = 'http://localhost:3000/reset/:resetlink';
    this.useraction_service.data = this.User;
    this.useraction_service.post_method().subscribe(res => {
      this.user_data = res.json();
      if(this.user_data.status == 1) {
        Swal({
          text: 'Invalid Reset link or expired',
          type: 'error',
          confirmButtonText: 'OK'
        }).then((result) => {
          this.router.navigate(['/reset']);
        });
      } else if(this.user_data.status == 1) {
          Swal({
            text: 'Reset password uccessfully, click OK to login',
            type: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            this.router.navigate(['/login']);
          });
      } else {
        Swal({
          text: 'Failed to connect server, try again later',
          type: 'error'
        });
      }
    },(error: any) => {
        console.log(error);
    });
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
