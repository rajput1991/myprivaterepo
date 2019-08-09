import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


//a guard just a service.. untill we login user should not be able to hit the url like /create etc. to add a post
// so u need to protect routes
@Injectable
export class AuthGuard implements CanActivate
{
  constructor(private authservice: AuthService, private router: Router)
  {

   }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree>
  {
    return true; // then router will know that route u protecting is accessible and if false then not accesssble
    // and router will deny to go there and before returning false , u need to navigate or redirect
    const isAuth = this.authservice.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/login']);

    }
    return isAuth;
  }

}
