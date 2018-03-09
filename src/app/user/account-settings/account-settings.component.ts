import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { existenceValidator } from '../../existence.validator';
import { ProfileService, Profile } from '../profile-service.service';

@Component({
  selector: 'wcm-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  nameControl: FormControl;
  emailControl: FormControl;
  urlControl: FormControl;
  biographyControl: FormControl;
  profile: Profile;
  profileEnabled = true;

  message: string;
  working = false;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private profiles: ProfileService,
    private router: Router
  ) {
    this.nameControl = new FormControl('', [Validators.required, Validators.maxLength(30),
    Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)], [existenceValidator(http, 'username')]);
    this.emailControl = new FormControl('', [Validators.required, Validators.email], [existenceValidator(http, 'email', true)]);
    this.urlControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z0-9\-]+$/)],
      [existenceValidator(http, 'profileURL')]);
    this.biographyControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);

    this.auth.onAuth(() => {
      this.profiles.getMyProfile().then(profile => {
        this.profile = profile;
        this.profileEnabled = this.profile.url !== null;
        if (!this.profileEnabled)
          this.profile.url = this.profile.username.toLowerCase().replace(/ /g, '-');
      });
    });
  }

  startRequest() {
    this.nameControl.disable();
    this.emailControl.disable();
    this.urlControl.disable();
    this.biographyControl.disable();
    this.working = true;
    this.message = 'Working...';
  }

  endRequest() {
    this.nameControl.enable();
    this.emailControl.enable();
    this.urlControl.enable();
    this.biographyControl.enable();
    this.working = false;
  }

  handleError(err) {
    console.error(err);
    this.message = err.error || err.status;
    this.working = false;
  }


  updateUsername() {
    this.startRequest();
    this.profiles.updateUsername(this.profile.username)
      .then(() => this.endRequest())
      .catch(err => this.handleError(err));
  }

  updateEmail() {
    this.startRequest();
    this.profiles.updateEmail(this.profile.email)
      .then(() => this.endRequest())
      .catch(err => this.handleError(err));
  }

  updateBiography() {
    this.startRequest();
    this.profiles.updateBiography(this.profile.biography)
      .then(() => this.endRequest())
      .catch(err => this.handleError(err));
  }

  enableProfile() {
    this.startRequest();
    this.profiles.enableProfile(this.profile.url)
      .then(() => {
        this.endRequest();
        this.profileEnabled = true;
      })
      .catch(err => this.handleError(err));
  }

  nameError() {
    return this.nameControl.hasError('required') ? 'You must enter a value' :
      this.nameControl.hasError('pattern') ? 'Only lower case letters, numbers, and single spaces between words be used.' :
        this.nameControl.hasError('availability') ? 'That username is already in use.' :
          '';
  }

  emailError() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
      this.emailControl.hasError('email') ? 'Must be a valid email address.' :
        this.emailControl.hasError('availability') ? 'That email is already in use.' :
          '';
  }

  biographyError() {
    return this.biographyControl.hasError('required') ? 'You must enter a value.' :
      this.biographyControl.hasError('minlength') ? 'Must be at least 20 characters long.' :
        '';
  }

  urlError() {
    return this.urlControl.hasError('required') ? 'You must enter a value.' :
      this.urlControl.hasError('pattern') ? 'Only lower case letters, numbers and dashes may be used.' :
        this.urlControl.hasError('availability') ? 'That URL is already in use.' :
          '';
  }

  canUpdateInfo() {
    return this.nameControl.valid &&
      this.emailControl.valid &&
      !this.working;
  }

  canUpdateBio() {
    return this.urlControl.valid &&
      this.biographyControl.valid &&
      !this.working;
  }



}
