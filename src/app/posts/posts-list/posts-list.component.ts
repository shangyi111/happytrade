import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../post';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>
  
  constructor(private postService: PostService, 
  			  public auth:AuthService ) { }

  ngOnInit(){
  	this.posts = this.postService.getPosts()
  }
  delete(id:string){
  	this.postService.delete(id)
  }

}
