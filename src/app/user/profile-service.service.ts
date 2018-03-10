import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { apiURL } from '../url';
import { HttpClient } from '@angular/common/http';

export interface Profile {
  username: string;
  biography: string;
  email: string;
  url: string;
  comics: Array<{
    title: string,
    url: string
  }>;
}

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  public getMyProfile() {
    return this.http.get(`${apiURL}/api/profile/myProfile`,
      { headers: this.auth.getAuthHeader() }
    ).toPromise()
      .then((profile: Profile) => {
        profile.comics = [];
        return profile;
      });
  }

  public getUserProfile(profileURL: string) {
    return this.http.get(`${apiURL}/api/profile/profiles/${profileURL}`)
      .toPromise()
      .then((data: any) => {
        return {
          username: data.user.username,
          biography: data.user.biography,
          url: profileURL,
          comics: data.comics,
          email: data.user.email
        } as Profile;
      });
  }

  public updateUsername(username: string) {
    return this.http.put(`${apiURL}/api/profile/updateUsername`,
      { username: username },
      { headers: this.auth.getAuthHeader(), responseType: 'text' }
    ).toPromise();
  }

  public updateEmail(email: string) {
    return this.http.put(`${apiURL}/api/profile/updateEmail`,
      { email: email },
      { headers: this.auth.getAuthHeader(), responseType: 'text' }
    ).toPromise();
  }

  public enableProfile(url: string) {
    return this.http.put(`${apiURL}/api/profile/enableProfile`,
      { profileURL: url }, { headers: this.auth.getAuthHeader(), responseType: 'text' }
    ).toPromise();
  }

  public updateBiography(biography: string) {
    return this.http.put(`${apiURL}/api/profile/updateBiography`,
      { biography }, { headers: this.auth.getAuthHeader(), responseType: 'text' }
    ).toPromise();
  }

  public updateInformation(profile: Profile) {

  }

}
