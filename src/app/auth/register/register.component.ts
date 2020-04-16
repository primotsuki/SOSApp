import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userGQL } from '../../graphql/user';
import { AlertController } from '@ionic/angular';

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
    private router: Router,
    private userquery: userGQL,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
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
      this.userquery
      .newUser({
          username: this.f.username.value,
          email: this.f.email.value,
          password: this.f.password.value
        }).subscribe(
        ({data}) => {
          this.okAlert();
        }, error => {
          alert("hubo un error al acceder a esta funcion" + error);
        }
      )
    }
  }
  async okAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmacion',
      message: 'El registro se completo',
      buttons: ['OK']
    });
    await alert.present();
  }
}
