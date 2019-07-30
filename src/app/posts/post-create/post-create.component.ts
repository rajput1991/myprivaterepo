import { Component } from "@angular/core";
import { templateJitUrl } from "@angular/compiler";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html"
})
export class PostCreateComponent {
  newPost = "NO CONTENT";
  enteredValue = "";
  // onAddPost(postInput: HTMLTextAreaElement) {
  //   //alert("Post Added");
  //   console.log(postInput);
  //   console.log(postInput.value);
  //   this.newPost = postInput.value;
  // }
  onAddPost() {
    this.newPost = this.enteredValue;
  }
}
