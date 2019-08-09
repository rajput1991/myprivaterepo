import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';


@Injectable({providedIn: 'root'})
export class AuthService
{
  private token: string;
    constructor(private http: HttpClient){

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
      // here we storing the token in service and we want to use this token in other part of application
      // for example in postservice for certain request such as Post DELETE and PUT
      // so simply add a method here getToken because token is private property
    });

  }

}
