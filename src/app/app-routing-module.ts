import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

//empty path means root page
const routes: Routes = [
  { path: '', component: PostListComponent }, // dont give empty string as path (i.e no space between quotes)
  { path: 'create', component: PostCreateComponent }

]
// now u need to inform angular router module about ur routes by importing Router module in angular module inside @ngmodule

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // notice we need to export Router Module with route configuration also this module to be used in Main App module
  exports: [RouterModule]

})
export class AppRoutingModule{

}
