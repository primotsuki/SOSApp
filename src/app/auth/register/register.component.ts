import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    RegisterForm: FormGroup;
    submitted = false;
    error: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  get f() { return this.RegisterForm.controls;}

  OnSubmit() {
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
    } else {
      const user = {
        username: this.f.username.value,
        email: this.f.email.value,
        password: this.f.password.value
      }
      console.log(user);
    }
  }

}
