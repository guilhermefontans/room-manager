import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  loginForm: FormGroup;
  error: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    console.log("aki");
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    this.authenticationService
    .authenticate(this.loginForm.value)
    .subscribe(
      data => {
        localStorage.setItem('id_token', data.token);
        this.router.navigate(['rooms']);
      },
      error => this.error = error.message
    );
  }
}