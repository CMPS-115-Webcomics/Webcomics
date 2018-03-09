import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { AuthenticationService } from './authentication.service';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ComposeOperationDialogComponent } from './confirm-operation-dialog/confirm-operation-dialog.component';

import { ProfileComponent } from './profile/profile.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileService } from './profile-service.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    RegisterComponent, LoginComponent, AccountSettingsComponent,
     VerifyEmailComponent, ProfileComponent, ComposeOperationDialogComponent
  ],
  providers: [AuthenticationService, ProfileService],
  declarations: [RegisterComponent, LoginComponent, VerifyEmailComponent, ProfileComponent,
    ResetPasswordComponent, ComposeOperationDialogComponent, AccountSettingsComponent],
  entryComponents: [ComposeOperationDialogComponent]
})
export class UserModule { }
