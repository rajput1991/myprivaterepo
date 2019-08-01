import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient)
  {

  }

  getPosts() {
   // return [...this.posts];
    //reach to backend and fetch posts and store them in posts. Fetching a post is asynchronous task and might take second
    //return this.posts;
    // anglular http client uses obserables and wont even send req. if you are not interested in response
    // also u need not to unsubscribe because angular handles this.
    //subscribe takes 3 arg. first : new data , 2nd error and third for when it completes. For now ,lets focus only on data
    // Making get of type Post[] might be wrong because body of response at backend contains message and posts
    // since Post at backend has id as well, so we should add this add front end model as well.
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts').subscribe((postData) =>
    {
      this.posts = postData.posts; //RHS is posts coming from server . Notice that no need to duplicate this as well because we cant accidently change
      //it onserver , there is no such connrection, it is http response.

      //Now we need to inform our app for this update
      this.postsUpdated.next([... this.posts]); // we are passing a copy of posts here because we cant edit posts in service
      // now u access the angular app using localhost:4200
     }
    );
  }

  getPostUpdateListner()
  {//since we emitting , someone need to listen and property is private.so wrote a method
    return this.postsUpdated.asObservable();
  }
  addPost(title: string, content: string) {
    const post: Post = { id:null, title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
