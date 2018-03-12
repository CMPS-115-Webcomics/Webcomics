import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../url';
import { MatDialog } from '@angular/material';
import { ComposeOperationDialogComponent } from './confirm-operation-dialog/confirm-operation-dialog.component';

interface UserData {
  token: string;
  username: string;
  role: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;
  private username: string;
  private role: string;
  private authChangeCallbacks: Array<(username: string) => void> = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    try {
      let data = JSON.parse(localStorage.getItem('login')) as UserData;
      this.confirmLogin(data.token).then((res) => {
        if (res) this.setLogin(data);
      });
    } catch (e) {
    }
  }

  public loggedIn() {
    return this.token !== undefined;
  }

  public logout() {
    this.token = undefined;
    this.username = undefined;
    this.role = undefined;
    localStorage.setItem('login', '');
    this.authChangeCallbacks.forEach(callback => callback(null));
  }

  private setLogin(data: UserData) {
    this.username = data.username;
    this.role = data.role;
    this.token = data.token;
    localStorage.setItem('login', JSON.stringify(data));
    this.authChangeCallbacks.forEach(callback => callback(data.username));
  }

  public isModerator() {
    return this.role && this.role !== 'user';
  }

  public onAuth(callback: (username: string) => void) {
    this.authChangeCallbacks.push(callback);
    if (this.loggedIn()) {
      callback(this.username);
    }
  }

  public getAuthHeader() {
    return new HttpHeaders({
      token: this.token || ''
    });
  }

  public verifyEmail(emailToken) {
    return this.http.post(`${apiURL}/api/auth/verifyEmail`, {}, {
      headers: new HttpHeaders({
        token: emailToken
      })
    }).toPromise();
  }

  public requestPasswordReset(usernameOrEmail: string) {
    return this.http.post(`${apiURL}/api/auth/requestReset`, {
      usernameOrEmail: usernameOrEmail
    }).toPromise();
  }

  public resetPassword(restToken, newPassword) {
    return this.http.post(`${apiURL}/api/auth/verifyReset`, {
      password: newPassword
    }, {
        headers: new HttpHeaders({
          token: restToken
        })
      })
      .toPromise()
      .then((data: UserData) => this.setLogin(data));

  }

  public register(username: string, email: string, password: string) {
    return this.http.post(`${apiURL}/api/auth/register`, {
      username: username,
      email: email.toLowerCase(),
      password: password
    }).toPromise()
      .then((data: UserData) => this.setLogin(data));
  }

  public login(usernameOrEmail: string, password: string) {
    return this.http.post(`${apiURL}/api/auth/login`, {
      usernameOrEmail: usernameOrEmail,
      password: password
    }).toPromise()
      .then((data: UserData) => this.setLogin(data));
  }

  public confirmLogin(token: string) {
    return this.http.get(`${apiURL}/api/comics/myComics`, {
      headers: new HttpHeaders({
        token: token
      })
    }).toPromise()
      .then(res => true)
      .catch(err => false);
  }

  public openChallengePrompt(challenge: string, message: string) {
    let dialogRef = this.dialog.open(ComposeOperationDialogComponent);
    dialogRef.componentInstance.message = message;
    dialogRef.componentInstance.challenge = challenge;
    return dialogRef.afterClosed().toPromise() as Promise<boolean>;
  }

  public ban(comicOwner: number) {
    this.http.post(`${apiURL}/api/auth/ban`, {
      accountID: comicOwner,
    }, {
        headers: this.getAuthHeader()
      }).toPromise();
  }
}
