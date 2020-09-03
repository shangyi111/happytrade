import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { SubscribeModule } from './homepage/subscribe.module';
import { TradegameComponent } from './tradegame/tradegame.component';
import { RoomlistComponent } from './roomlist/roomlist.component';
import { AddroomComponent } from './addroom/addroom.component';
import { ChatroomComponent } from './chatroom/chatroom.component';

const routes:Routes =[
  { path:'home',loadChildren:'./homepage/subscribe.module#SubscribeModule'},
  { path:'',redirectTo:'/home',pathMatch:'full'},
  { path:'game',component:TradegameComponent},
  { path: 'roomlist', component: RoomlistComponent },
  { path: 'addroom', component: AddroomComponent },
  { path: 'chatroom/:roomname', component: ChatroomComponent },
  
  // {
  //   path:'',loadChildren: './posts/posts.module#PostsModule'
  // }
]

@NgModule({
  declarations: [
    AppComponent,
    TradegameComponent,
    RoomlistComponent,
    AddroomComponent,
    ChatroomComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    CoreModule,
    SharedModule,
    PostsModule,
    SubscribeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, BrowserAnimationsModule // storage
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
