import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.css']
})
export class SignUpComponent implements OnInit,OnDestroy
{
    private authStatusSub: Subscription;
    isLoading=false;
  ngOnDestroy(): void
  {
    this.authStatusSub.unsubscribe();
  }

  ngOnInit(): void
  {
    this.authStatusSub = this.authservice.getAuthStatusListener().subscribe(authStatus =>
    {
    this.isLoading = false;

    });
  }

  //since we already providing authservice in root ,so lets inject this

  constructor(public authservice: AuthService){

  }
  onSignup(form: NgForm)
  {
    console.log(form.value);
    // we want to create a request on backend to create a new userv
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authservice.createUser(form.value.email, form.value.password);
    // check in console log by creating duplicate user to see the validation, you should get error 500 about unique user
  }

}
