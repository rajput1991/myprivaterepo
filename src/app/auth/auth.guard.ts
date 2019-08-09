import { CanActivate } from '@angular/router';


//a guard just a service.. untill we login user should not be able to hit the url like /create etc. to add a post
// so u need to protect routes
export class AuthGuard implements CanActivate
{
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree>
  {
    return true; // then router will know that route u protecting is accessible and if false then not accesssble
    // and router will deny to go there and before returning false , u need to navigate or redirect
  }

}
