import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule} from 'ngx-owl-carousel-o';
import { HomepageComponent } from './homepage.component';
import { SubscribeService } from './subscribe.service';
import { SharedModule } from '../shared/shared.module';


const routes: Routes =[
	{path:'home', component:HomepageComponent }
]


@NgModule({
  declarations: [HomepageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CarouselModule
  ],
  providers:[SubscribeService]
})
export class SubscribeModule { }


