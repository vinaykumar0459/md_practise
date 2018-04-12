import { NgModule } from '@angular/core';
import { ChatRoomComponent } from './chat-room.component';
import { ChatRoomRoutingModule } from './chat-room.routing';
import { CommonModule } from '@angular/common';

@NgModule({
    imports:[
        ChatRoomRoutingModule,
        CommonModule
    ],
    declarations: [ 
        ChatRoomComponent,
    ],
    providers: [
        
    ]
})

export class ChatRoomModule {}