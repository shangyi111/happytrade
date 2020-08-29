import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';

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

const routes:Routes =[
  {path:'home',loadChildren:'./homepage/subscribe.module#SubscribeModule'},
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'game',component:TradegameComponent},

  
  // {
  //   path:'',loadChildren: './posts/posts.module#PostsModule'
  // }
]

@NgModule({
  declarations: [
    AppComponent,
    TradegameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
