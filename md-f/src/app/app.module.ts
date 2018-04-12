// import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { appRouting, appRoutingProviders } from './app.routing';
import { HttpModule } from "@angular/http";
// import { RegisterComponent } from './user-actions/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    // RegisterComponent
  ],
  imports: [
    // BrowserModule, 
    appRouting,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }