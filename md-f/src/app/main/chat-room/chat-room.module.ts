import { NgModule } from '@angular/core';
import { ChatRoomComponent } from './chat-room.component';
import { ChatRoomRoutingModule } from './chat-room.routing';
import { CommonModule } from '@angular/common';
import { FriendsListComponent } from './friends-list/friends-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports:[
        ChatRoomRoutingModule,
        CommonModule,
        FlexLayoutModule
    ],
    declarations: [ 
        ChatRoomComponent, FriendsListComponent, ChatBoxComponent,
    ],
    providers: [
        
    ]
})

export class ChatRoomModule {}