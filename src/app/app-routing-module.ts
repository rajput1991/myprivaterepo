import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { DashBoardComponent } from './dashboard/dashboard-component';
import { TemplateGeneratorComponent } from './core/devops/template-generator.component';

//empty path means root page
const routes: Routes = [
  { path: '', component: PostListComponent }, // dont give empty string as path (i.e no space between quotes)
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent , canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'dashboard', component: TemplateGeneratorComponent },
  { path: 'orchestration', component: TemplateGeneratorComponent },

  // notice Postcreatecomponent now will be loaded for different paths , one for save and one for edit

]
// now u need to inform angular router module about ur routes by importing Router module in angular module inside @ngmodule

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // notice we need to export Router Module with route configuration also this module to be used in Main App module
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule{

}
