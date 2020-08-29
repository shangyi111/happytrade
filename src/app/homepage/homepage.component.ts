import { HostListener, AfterContentInit, Component, ViewChild, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from'rxjs';
import { AngularFireStorage } from'@angular/fire/storage';
import { SubscribeService } from './subscribe.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  name: string;
  email:string;
  buttonText:string ="Submit for website updates";
  
  constructor(private subscribeService: SubscribeService){

  }
  ngOnInit() {
    this.customOptions
  	// this.bodyWidth = document.body.offsetWidth;
  }
  createRecord(){
    const Record = {
      name: this.name,
      email: this.email,
    }
    this.subscribeService.create(Record)
    this.name =""
    this.email=""
    this.buttonText = "Subscribed"
    setTimeout(()=>this.buttonText = "Submit for website updates",3000)
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    // autoplayTimeout:1000,
    autoplayHoverPause:false,
    // mouseDrag: true,
    // touchDrag: true,
    // pullDrag:false,
    // slideTransition: 'linear',
    dots: true,
    smartSpeed: 500,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      300: {
        items: 1
      },
      600: {
        items: 1
      },
    },
    nav: true
  }
 //  @HostListener('window:resize', ['$event'])
	// onResize(event) {
	//   this.bodyWidth = event.target.innerWidth;
	// }

	

}
