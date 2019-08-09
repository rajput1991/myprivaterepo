import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent
{
  isLoading = false;
  constructor(private authservice: AuthService)
  {

  }
  onLogin(form: NgForm)
  { console.log(form);
    if (form.invalid) {
      return;
    }
    // this will call service and service will call backend and backend will call db
    this.authservice.login(form.value.email, form.value.password);
    // test via create a user and then login

  }

}
