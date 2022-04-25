import { Component, OnInit } from '@angular/core';
import {
  AbstractControl, FormBuilder,
  FormGroup, ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public connectionService: ConnectionService) {
                console.log(this.connectionService.data);
  }

  get controls() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    console.log(this.connectionService.data);

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9\-]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: this.passwordEqualityValidator,
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const un = this.registerForm.get('username').value;
    const pw = this.registerForm.get('password').value;
    const email = this.registerForm.get('email').value;

    this.connectionService.register(un, email, pw).subscribe(next => {
        console.log("inner")
        this.submitted = true;
        this.loading = true;
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log('Error');
      });
  }

  passwordEqualityValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    const predicate = password && confirmPassword && password.value === confirmPassword.value;
    const error = {passwordMismatch: true};

    confirmPassword.setErrors(predicate ? null : error);

    return predicate ? null : error;
  }

}