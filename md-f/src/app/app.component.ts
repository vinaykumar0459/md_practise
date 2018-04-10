import {Component, Inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService} from './app.service';

@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.scss']
})
  
export class AppComponent {  
  dummy : string;  
  gender: string;  
  constructor(public dialog: MatDialog) {}  
  openDialog(): void {    
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {      
      width: '400px',      
      data: {}    
    });    
    dialogRef.afterClosed().subscribe(result => {      
      console.log('The dialog was closed');      
      this.gender = result;
    });  
  }
}

@Component({  
  selector: 'dialog-overview-example-dialog',  
  templateUrl: 'dialog-overview-example-dialog.html'
})
export class DialogOverviewExampleDialog {  
  User : dialogdetails;  
  dummyip : any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private app_service:AppService) { }

  ngOnInit() { 
    var randomnumber = Math.random().toString(36).substring(7);
    this.app_service.getip()
      .subscribe(ipaddress => this.dummyip = ipaddress);  
      console.log(this.dummyip)     
    this.User = {      
      dummy : randomnumber,      
      gender : "",
      dummyip : this.dummyip
    }   
       
  }
  dialoguserdetails(User) {
    console.log(this.User)
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }  
}
          
interface dialogdetails {  
  dummy : string;  
  gender : string;
  dummyip : any;
}