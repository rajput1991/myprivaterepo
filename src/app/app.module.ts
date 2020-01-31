import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatExpansionModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';


import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostService } from './posts/post.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { DashBoardComponent } from './dashboard/dashboard-component';
import { SubHeaderComponent } from './dashboard/subheader/sub-header.component';
import { AppCommonModule } from './core/common.module';
import { AgmCoreModule } from '@agm/core';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignUpComponent,
    DashBoardComponent,
    SubHeaderComponent,
    ErrorComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    AppCommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCxhPK7U85dd2waazHcPyC-E9Z6lyH_4ow'
      /* apiKey is required, unless you are a
      premium customer, in which case you can
      use clientId
      */
    })

  ],

  providers: [PostService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
