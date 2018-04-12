import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserActionsComponent, DialogOverviewExampleDialog } from './user-actions.component';
import { UserActionsRouting } from './user-actions.routing';
import { MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule, MatDialogModule,
    MatMenuModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule,MatButtonModule } from '@angular/material';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserActionsService } from './user-actions.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

@NgModule({
    imports:[
        UserActionsRouting,
        FormsModule,
        // BrowserAnimationsModule,
        MatFormFieldModule,
        FormsModule,
        MatRadioModule,
        MatInputModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        MatDialogModule,
        FlexLayoutModule,
        HttpClientModule,
        HttpModule,
        // BrowserModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [ 
        UserActionsComponent,
        RegisterComponent,
        LoginComponent,
        ForgotPasswordComponent,
        DialogOverviewExampleDialog
    ],
    entryComponents: [DialogOverviewExampleDialog],
    providers: [UserActionsService],
    exports: [ UserActionsComponent ]
})

export class UserActionsModule {}