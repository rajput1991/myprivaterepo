import { Component, EventEmitter,Output } from "@angular/core";


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls:['./post-create.component.css']
})
export class PostCreateComponent {

  enteredContent = "";
  enteredTitle = "";
 @Output() postCreated = new EventEmitter();
  // onAddPost(postInput: HTMLTextAreaElement) {
  //   //alert("Post Added");
  //   console.log(postInput);
  //   console.log(postInput.value);
  //   this.newPost = postInput.value;
  // }
  onAddPost()
  {  // emit your own event for post to be used in postlist component, Use Eventemiiter and pass the post as arguement
    // Use decorator to tell component that this event can be used outside as well. Use @Outout
    const post = {
      title: this.enteredTitle, content: this.enteredContent
    };
    this.postCreated.emit(post);

  }
}
