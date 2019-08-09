import { Component, OnInit } from '@angular/core';
import { Post } from './posts/post.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService)
  {

  }
  ngOnInit(): void
  {
    this.authservice.getAuthUser(); // its auto auth user
  }
  //title = 'mean-project';

  // storedPosts: Post[] = [];

  // onPostAdded(post)
  // {
  //   //since array is of type Post now .. you cant add anything . so it enforces structure of Post
  //   this.storedPosts.push(post);
  // }

}
