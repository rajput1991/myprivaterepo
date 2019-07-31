import { Component, EventEmitter, Output } from "@angular/core";
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { PostService } from '../post.service';




@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent {

  enteredContent = "";
  enteredTitle = "";
  //Now it can emit only Post
 //@Output() postCreated = new EventEmitter<Post>();
  // onAddPost(postInput: HTMLTextAreaElement) {
  //   //alert("Post Added");
  //   console.log(postInput);
  //   console.log(postInput.value);
  //   this.newPost = postInput.value;
  // }
  constructor(public postservice: PostService)
  {

  }
  onAddPost(form: NgForm)
  {  // emit your own event for post to be used in postlist component, Use Eventemiiter and pass the post as arguement
    // Use decorator to tell component that this event can be used outside as well. Use @Outout
    if (form.invalid)
    {
      return;
    }
    const post: Post = {
      // note on value u have to acces name attribute value which you gave in HTML
      title: form.value.title,
      content: form.value.content
    };
   // this.postCreated.emit(post);
    this.postservice.addPost(form.value.title, form.value.content);

  }
}
