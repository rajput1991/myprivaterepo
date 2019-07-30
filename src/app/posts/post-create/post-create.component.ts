import { Component } from "@angular/core";
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html"
})
export class PostCreateComponent
{
  newPost = 'NO CONTENT';
  onAddPost() {
    alert("Post Added");
    this.newPost = 'The user\'s Post';
  }
}
