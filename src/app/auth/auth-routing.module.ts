import { PreloadAllModules,RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AuthComponent} from './auth.component'

const routes: Routes = [{
    path: '',
    component: AuthComponent,
    children: [
        { path: 'register',
          component: RegisterComponent},
        {
          path: 'login',
          component: LoginComponent
        }
    ]
}];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class AuthRoutingModule{
  }