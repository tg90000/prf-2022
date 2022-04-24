import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service'
import { ConnectionService } from '../../services/connection.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionService: SessionService,
    private connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;
    this.loading = true;

    const un = this.loginForm.get('username').value;
    const pw = this.loginForm.get('password').value

    this.connectionService.login(un, pw).subscribe(
      response => {
        this.sessionService.create(response.token, un);
        this.submitted = false;
        this.loading = false;
        this.loginForm.setErrors({invalid: true});
        this.router.navigateByUrl('/products');
        

      });
  }
}
