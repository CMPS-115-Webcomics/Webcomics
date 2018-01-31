import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../url';


@Injectable()
export class AuthenticationService {
  private token: string;
  private username: string;

  constructor(private http: HttpClient) {
    let data = JSON.parse(localStorage.getItem('login'));
    if (data) {
      this.setLogin(data.username, data.token);
    }
  }

  public loggedIn() {
    return this.token !== undefined;
  }

  private setLogin(username: string, token: string) {
    this.token = token;
    this.username = username;
    localStorage.setItem('login', JSON.stringify({ token: token, username: username }));
  }

  public getAuthHeader() {
    return new HttpHeaders({
      token: this.token
    });
  }

  public register(username: string, email: string, password: string) {
    return this.http.post(`${apiURL}/api/auth/register`, {
      username: username,
      email: email,
      password: password
    }).toPromise()
      .then((res: any) => {
        this.setLogin(username, res.token);
      });
  }

  public login(username: string, password: string) {
    return this.http.post(`${apiURL}/api/auth/login`, {
      username: username,
      password: password
    }).toPromise()
      .then((res: any) => {
        this.setLogin(username, res.token);
      });
  }

}
