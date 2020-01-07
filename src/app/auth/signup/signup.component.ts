import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls:['./signup.component.css']
})
export class SignUpComponent
{
  isLoading=false;
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
