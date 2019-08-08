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
    // note once adding a post , we are  setting id null explicitly
    // so if u add a post and delete , it will be gone from frontend but again u reload app ,it will come it is issue.
    // notice we are not using id which is generated at db server side
    const post: Post = { id: null, title: title, content: content };

    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post).subscribe((responseData) =>
    {
      console.log(responseData.message);
      const id = responseData.postId;
      // push to local only iff successful response
      // Test the application with both client and server side console.log for POst end point on posts
      post.id = id;
      // notice we only overriding one property of object defined earlier and not the object itself.
      // now u can store the post with the updated id
      // test now
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });

  }
  getPost(id: string)
  {
    // we will return new cloned object here
    // pull out all property of object and add them to new object , so that u dont manipulate original object
   // return { ...this.posts.find(p => p.id == id) };
    return this.http.get<{_id: string,title: string, content: string}>('http://localhost:3000/api/posts/' + id);
    // notice we wont subscribe here and will subscribe in Post create component
  }
  updatePost(id:string, title:string, content:string)
  {
  const post: Post={
    id:id,
    title: title,
    content:content
    }
    //notice put takes payload unlike DELETE
    this.http.put('http://localhost:3000/api/posts/' + id, post).subscribe((response) =>
    {
      console.log(response);
      // lets replace current verison of post in post array with that version
      // first lets clone posts array
      const updatedPosts = [... this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id == post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
     // now we have to make sure also once we are on edit page and we reload page , it shd display same page and not empty
      // add a route in app.js for that
    })
  }
  deletePost(postId: string)
  {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() =>
    {  // filer will work on every element of array and if it return true, it will be kept and if false, it wont be kept in array
      // so updatedPosts will be all posts except which we deleted by postId
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts; // updated the original array with the one which came after deleting post;
      this.postsUpdated.next([...this.posts]); // by this whole app knows about this change
      console.log("Deleted now");
    });
  }
}
