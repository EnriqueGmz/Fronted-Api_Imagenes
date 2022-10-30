import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from './validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  emailpattern: any =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(this.emailpattern),
          ]),
          ,
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [Validation.passwordCheck('password', 'confirmPassword')],
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  submit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
