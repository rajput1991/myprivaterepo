import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostService
{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient)
  {

  }

  getPosts()
  {
    // return [...this.posts];
    //reach to backend and fetch posts and store them in posts. Fetching a post is asynchronous task and might take second
    //return this.posts;
    // anglular http client uses obserables and wont even send req. if you are not interested in response
    // also u need not to unsubscribe because angular handles this.
    //subscribe takes 3 arg. first : new data , 2nd error and third for when it completes. For now ,lets focus only on data
    // Making get of type Post[] might be wrong because body of response at backend contains message and posts
    // since Post at backend has id as well, so we should add this add front end model as well.
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>
    { return postData.posts.map(post=>{

      return {
     title: post.title,
     content: post.content,
     id: post._id
      };
    });
    }
      ))
    .subscribe((transformposts) =>
    {
      this.posts = transformposts; //RHS is posts coming from server . Notice that no need to duplicate this as well because we cant accidently change
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
  addPost(title: string, content: string)
  {
    const post: Post = { id: null, title: title, content: content };

    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((responseData) =>
    {
      console.log(responseData.message);
      // push to local only iff successful response
      // Test the application with both client and server side console.log for POst end point on posts
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }
  deletePost(postId: string)
  {
    this.http.delete('http://localhost:3000/api/posts' + postId).subscribe(() =>
    {  // filer will work on every element of array and if it return true, it will be kept and if false, it wont be kept in array
      // so updatedPosts will be all posts except which we deleted by postId
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts; // updated the original array with the one which came after deleting post;
      this.postsUpdated.next(...[this.posts]);// by this whole app knows about this change
      console.log("Deleted");
    })
  }
}
