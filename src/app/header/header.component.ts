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
    this.authListnerSub = this.authservice.getAuthStatusListener().subscribe();


  }

}
