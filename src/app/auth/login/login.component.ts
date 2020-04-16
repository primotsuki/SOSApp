import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { userGQL } from '../../graphql/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  submitted = false;
  error: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userQuery: userGQL
  ) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }
  get f() { return this.LoginForm.controls;}

  OnSubmit(){
    this.submitted = true;
    if(this.LoginForm.invalid){
      return;
    } else {
      this.userQuery.login({
        email: this.f.email.value,
        password: this.f.password.value
      }).subscribe(
        ({data}) => {
          console.log(data);
        }, error => {
          alert("hubo un error");
        }
      )
    }
  }
}
