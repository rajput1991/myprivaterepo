import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'mean-project';

  storedPosts: Post[] = [];

  onPostAdded(post)
  {
    //since array is of type Post now .. you cant add anything . so it enforces structure of Post
    this.storedPosts.push(post);
  }
}
