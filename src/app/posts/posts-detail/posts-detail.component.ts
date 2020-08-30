import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild("myDiv") divView: ElementRef;

  constructor(
  	private route: ActivatedRoute,
    private router:Router,
    public auth:AuthService,
  	private postService: PostService,
    private hostElement: ElementRef,
  ) { }

  ngOnInit() {
  	this.getPost();

  }

  getPost(){
  	const id = this.route.snapshot.paramMap.get('id');
  	return this.postService
      .getPostData(id)
      .subscribe(data=> {
        data.published = new Date((data.published as any).seconds*1000);
        this.post = data
      });
  }

  updatePost(){
    const formData = {
      title:this.post.title,
      content:this.post.content
    };
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.update(id,formData);
    this.editing = false;

  }
  delete(){
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.delete(id);
    this.router.navigate(["/blog"]);
  }

  updateContent() {
    console.log(this.hostElement);
    this.hostElement.nativeElement.querySelector('div#postContent').innerHTML = this.post.content;
    return true;
  }


}
