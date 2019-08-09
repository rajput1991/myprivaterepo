import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy
{
  private authListnerSub: Subscription;
  userIsAuthenticated = false;
  //inject authservice here to know if we are authenticated or not
  constructor(private authservice: AuthService)
  {

  }
  ngOnDestroy()
  {
    this.authListnerSub.unsubscribe();
  }
  ngOnInit()
  {
    this.userIsAuthenticated = this.authservice.getIsAuth();
    this.authListnerSub = this.authservice.getAuthStatusListener().subscribe(isAuthenticated =>
    {
      this.userIsAuthenticated = isAuthenticated;
    });


  }
  onLogout()
  {
    //should clear token and inform all interested part of page about auth status
    this.authservice.logout();
  }

}
