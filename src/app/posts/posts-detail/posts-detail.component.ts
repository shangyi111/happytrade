import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../../core/auth.service';

import { Post } from '../post';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css']
})
export class PostsDetailComponent implements OnInit {
  post: Post
  editing: boolean = false

  constructor(
  	private route: ActivatedRoute,
    private router:Router,
    public auth:AuthService,
  	private postService: PostService,
  ) { }

  ngOnInit() {
  	this.getPost();
  	console.log(this);
  }

  getPost(){
  	const id = this.route.snapshot.paramMap.get('id')
  	return this.postService
      .getPostData(id)
      .subscribe(data=>this.post = data)
  }

  updatePost(){
    const formData = {
      title:this.post.title,
      content:this.post.content
    }
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.update(id,formData)
    this.editing = false

  }
  delete(){
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id)
    this.router.navigate(["/blog"])
  }



}
