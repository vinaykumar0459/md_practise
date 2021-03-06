import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { CommonModule } from '@angular/common';
import { NavIconsComponent } from './nav-icons/nav-icons.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
    imports:[
        MainRoutingModule,
        CommonModule,
        FlexLayoutModule
    ],
    declarations: [ 
        MainComponent, NavIconsComponent
    ],
    providers: [
        AuthGuard
    ]
})

export class MainModule {}