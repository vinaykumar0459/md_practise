import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room.component';

const ChatRoomRoutes: Routes = [
    {
      path : '',
      pathMatch:'full',
      component : ChatRoomComponent, 
      
    //   children: [
    //     {
    //     path : 'human-resource',
    //     loadChildren : './human-resource/human-resource.module#HumarResourceModule' 
    //     }
    // ]
    },
  ];
  
  @NgModule ( {
    imports : [ RouterModule.forChild ( ChatRoomRoutes) ],
    exports : [ RouterModule ],
  } )
  
  export class ChatRoomRoutingModule {
  }