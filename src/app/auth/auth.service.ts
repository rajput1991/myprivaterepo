import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class AuthService
{
  private token: string;
  private authstatusListner = new Subject<boolean>();
  private isAuthenticated = false;

  getAuthStatusListener()
  { //read transcript
    return this.authstatusListner.asObservable();
  }

    constructor(private http: HttpClient){

  }
  getToken()
  { // now post service can use this method to access token
    // we have to inject authservice in postservice and add a header in ongoing req. from authservice
    return this.token;
  }

  getIsAuth()
  {
    return this.isAuthenticated;
  }

    createUser(email: string,password: string){
        const authData: AuthData={
            email: email,
            password: password
        }
        this.http.post("http://localhost:3000/api/user/signup",authData).subscribe(respponse=>{
            console.log(respponse);

        })

    }
    // connect authservice to signupcomponent

    // connect this method to LoginComponent
  login(email: string, password: string)
  {
    const authData: AuthData={
      email: email,
      password: password
  }
    this.http.post<{ token: string }>("http://localhost:3000/api/user/login", authData).subscribe(response =>
    {
      console.log(response);
      const token = response.token;
      this.token = token;
      if (token) {
        this.isAuthenticated = true;
        // inform everyone about user being authenticated
              this.authstatusListner.next(true);

      }

      // here we storing the token in service and we want to use this token in other part of application
      // for example in postservice for certain request such as Post DELETE and PUT
      // so simply add a method here getToken because token is private property
    });

  }
  logout()
  {
    this.token = null;
    this.isAuthenticated = false;
    this.authstatusListner.next(false);
  }

}
