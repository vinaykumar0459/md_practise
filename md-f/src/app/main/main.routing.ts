import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const MainRoutes: Routes = [
    {
      path : '',
      pathMatch:'full',
      component : MainComponent,
      children: [
        {
            path : '',
            loadChildren : './chat-room/chat-room.module#ChatRoomModule' 
        }
    ]
    },
  ];
  
  @NgModule ( {
    imports : [ RouterModule.forChild ( MainRoutes) ],
    exports : [ RouterModule ],
  } )
  
  export class MainRoutingModule {
  }