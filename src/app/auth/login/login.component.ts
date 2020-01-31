import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy
{
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(private authservice: AuthService)
  {

  }
  ngOnInit(): void
  {
    this.authStatusSub = this.authservice.getAuthStatusListener().subscribe(authStatus =>
    {
    this.isLoading = false;

    });
  }
  ngOnDestroy(): void
  {
    this.authStatusSub.unsubscribe();
  }
  onLogin(form: NgForm)
  { console.log(form);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // this will call service and service will call backend and backend will call db
    this.authservice.login(form.value.email, form.value.password);
    // test via create a user and then login

  }

}
