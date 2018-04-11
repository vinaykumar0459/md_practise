import {Component, Inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService} from './app.service';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent {  
  login_id : string;  
  gender: string;  
  constructor(public dialog: MatDialog) {}  
  openDialog(): void {    
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {      
      width: '400px',      
      data: {}    
    });    
    // dialogRef.afterClosed().subscribe(result => {      
    //   console.log('The dialog was closed');      
    //   this.gender = result;
    // });  
  }
}

@Component({  
  selector: 'dialog-overview-example-dialog',  
  templateUrl: 'dialog-overview-example-dialog.html'
})
export class DialogOverviewExampleDialog {  
  User : dialogdetails;  
  dummyip : string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private app_service:AppService) { }

  ngOnInit() { 
    this.app_service.url = 'http://freegeoip.net/json/';
    var randomnumber = Math.random().toString(36).substring(7);
    this.app_service.getip()
      .subscribe(ipaddress => {
        this.User.ipaddress_main = ipaddress.json()
        this.User.user_ip = ipaddress.json().ip
      });
    this.User = {      
      login_id : randomnumber,      
      gender : "",
      user_ip : "",
      ipaddress_main : ""
    }   
       
  }
  dialoguserdetails(User) {
    console.log(this.User)
    this.dialogRef.close()
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }  
}
          
interface dialogdetails {  
  login_id : string;  
  gender : string;
  user_ip : any;
  ipaddress_main : any;
}