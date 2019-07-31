import { Component, Input, OnInit } from "@angular/core";
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit
{
  // posts = [
  //   {title:'First Post', Content:'This is First Post\'s Content'},
  //   { title: 'second Post', Content: 'This is Second Post\'s Content' },
  //   {title:'Third Post', Content:'This is Third Post\'s Content'}
  // ]

  // since PostCreatecomponent is emitting event using @Output , so it makes sense to use @Input here
  posts: Post[] = [];
  //postsService: PostService;

  constructor(public postsService: PostService)
  {
 // this.postsService = postsService;

  }
  ngOnInit(){
    this.posts = this.postsService.getPosts();
  }


}
