import { Component } from '@angular/core';
import { DBService } from './offline/db.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  template: '<ion-router-outlet></ion-router-outlet>',
})
export class AppComponent {
    title = 'SOS APK'

    constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private db: DBService
    ){
      this.initializeApp()
    }
    initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.db.openDatabase();
      });
    }
}
