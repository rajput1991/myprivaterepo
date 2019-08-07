import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredContent = "";
  enteredTitle = "";
  private mode = 'create';
  private postId: string;
   post: Post; // u can access this in its html in ngmodel since it public
  //Now it can emit only Post
 //@Output() postCreated = new EventEmitter<Post>();
  // onAddPost(postInput: HTMLTextAreaElement) {
  //   //alert("Post Added");
  //   console.log(postInput);
  //   console.log(postInput.value);
  //   this.newPost = postInput.value;
  // }
  constructor(public postservice: PostService, public route: ActivatedRoute)
  {
  // This Activated route will give us information of current router and by router we can decide whether it is edit or create post
    // but better use ngOnInit for getting route info and see if it has postid or not
  }
  ngOnInit()
  {// paramMap is an obserable that u can subscribe and for all inbuilt observable we never unsubscribe
    //Now it is an observable because the parameter in the url could change whilst we're on the page because
    //we could have some link which we can click to essentially load the same angular component but for a
    //different post ID let's say, so only the ID in the url would change, the component is the same
    //but obviously the data we display on that component would need to change too and that is why we get
    //this observable.
    //With that, we can listen to changes in the route url or in the parameters to be precise and we can
//therefore react to that and update our UI
//but angular avoids the unnecessary re-rendering of the entire component which is, well
//which really doesn't make a lot of sense because it's still the same component,
//we just need to know about the change
    this.route.paramMap.subscribe((paramMap: ParamMap) =>
    {
      if (paramMap.has('postId')) {
       //means we want edit else its create componnent , so store this info in private varaible
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postservice.getPost(this.postId);
        // now just fill ur form with this post and handle submission
    } else{
        this.mode = 'create';
        this.postId = null;
    }
      //this will execute,whenever param will change in url
    });

  }
  onSavePost(form: NgForm)
  {  // emit your own event for post to be used in postlist component, Use Eventemiiter and pass the post as arguement
    // Use decorator to tell component that this event can be used outside as well. Use @Outout
    if (form.invalid)
    {
      return;
    }
    const post: Post = {
      // note on value u have to acces name attribute value which you gave in HTML
      id: null,
      title: form.value.title,
      content: form.value.content
    };
    if(this.mode =='create'){
   // this.postCreated.emit(post);
      this.postservice.addPost(form.value.title, form.value.content);
    }
    else {
      this.postservice.updatePost(this.postId,form.value.title, form.value.content);
    }
    form.resetForm();

  }
}
