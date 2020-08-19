import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostsDashboardComponent } from './posts-dashboard/posts-dashboard.component';
import { PostsDetailComponent } from './posts-detail/posts-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostService } from './post.service';
import { SharedModule } from '../shared/shared.module';

const routes: Routes =[
	{path:'blog', component:PostsListComponent },
	{path:'blog/:id',component:PostsDetailComponent },
	{path: 'dashboard', component:PostsDashboardComponent}
]

@NgModule({
  declarations: [PostsDashboardComponent, PostsDetailComponent, PostsListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers:[PostService]
})
export class PostsModule { }
