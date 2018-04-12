import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { CommonModule } from '@angular/common';
import { NavIconsComponent } from './nav-icons/nav-icons.component';

@NgModule({
    imports:[
        MainRoutingModule,
        CommonModule
    ],
    declarations: [ 
        MainComponent, NavIconsComponent
    ],
    providers: [
        
    ]
})

export class MainModule {}