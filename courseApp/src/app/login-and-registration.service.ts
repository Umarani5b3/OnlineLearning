import { Injectable } from '@angular/core';
import { User } from './models/User';
import { Observable, throwError } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginAndRegistrationService {
  baseURL = "http://localhost:3000/users";

  constructor(private http: HttpClient,private router: Router) { }


  addUser(username: string, mobile: string, email: string, password:string, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("username", username);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("password",password)
    formData.append("avatar", profileImage);

    console.log("service",formData)
    
    return this.http.post<User>(`${this.baseURL}/create-user`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  signIn(user : User){
    return this.login(user.email, user.password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(res.body.data._id, res.body.authToken);
      })
    )
  }

  private setSession(userId: string, accessToken: string) {
    localStorage.setItem('user_id', userId);
    localStorage.setItem('x-access-token', accessToken);
  }

  login(email: string, password: string) {
    return this.http.post(this.baseURL+'/sign-in', {
      email,
      password
    }, {
        observe: 'response'
      });
  }

  getCurrentUserData(id:string){
    return this.http.get(this.baseURL+ `/${id}`);
  }

  logout() {
    this.removeSession();

    this.router.navigate([' ']);
  }

  private removeSession() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('x-access-token');
  }

}
