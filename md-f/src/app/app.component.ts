import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {  
  User : dialogdetails;  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { 
    var randomnumber = Math.random().toString(36).substring(7);       
    this.User = {      
      dummy : randomnumber,      
      gender : "" 
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
}