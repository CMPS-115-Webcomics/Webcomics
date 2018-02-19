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


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    RegisterComponent, LoginComponent, VerifyEmailComponent
  ],
  providers: [AuthenticationService],
  declarations: [RegisterComponent, LoginComponent, VerifyEmailComponent, ResetPasswordComponent]
})
export class UserModule { }
