import { Component } from '@angular/core';

@Component({
    selector: 'ngx-auth',
    template: `
    <ion-app>
      <ion-content>
      <ion-router-outlet></ion-router-outlet>
      </ion-content>
    </ion-app>
    `,
})
export class AuthComponent {
}