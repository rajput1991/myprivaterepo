import { Component } from "@angular/core";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls:['./post-list.component.css']
})
export class PostListComponent
{
  posts = [
    {title:'First Post', Content:'This is First Post\'s Content'},
    { title: 'second Post', Content: 'This is Second Post\'s Content' },
    {title:'Third Post', Content:'This is Third Post\'s Content'}
  ]



}
