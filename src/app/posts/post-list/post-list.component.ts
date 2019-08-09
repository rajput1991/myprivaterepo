import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy
{
  // posts = [
  //   {title:'First Post', Content:'This is First Post\'s Content'},
  //   { title: 'second Post', Content: 'This is Second Post\'s Content' },
  //   {title:'Third Post', Content:'This is Third Post\'s Content'}
  // ]

  // since PostCreatecomponent is emitting event using @Output , so it makes sense to use @Input here
  posts: Post[] = [];
  private postSub: Subscription;
  isLoading = false;
  private authstatusSub: Subscription;
  userIsAuthenticated = false;
  //postsService: PostService;

  constructor(public postsService: PostService, private authservice: AuthService)
  {
 // this.postsService = postsService;

  }
  ngOnInit()
  {
    this.isLoading = true;
    this.postsService.getPosts();
   this.postSub= this.postsService.getPostUpdateListner().subscribe((posts: Post[]) =>
   {
   this.isLoading = false;
      this.posts = posts;
   });
    this.authstatusSub = this.authservice.getAuthStatusListener().subscribe(isAuthenticated =>
    {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  onDelete(postId: string)
  {
    this.postsService.deletePost(postId);
    // now u can check it should atleast send a req. , check logs on frontend as well as on backend
    // but we still did not updated array on frontend and we actually also did not deleted from backend as well
  }

  ngOnDestroy()
  {
    //to avoid memory leak if component is not part of dom
    this.postSub.unsubscribe();
    this.authstatusSub.unsubscribe();
  }


}
