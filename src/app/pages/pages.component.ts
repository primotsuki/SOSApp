import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'pages-root',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.scss']
})
export class PagesComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Mis mascotas',
      url: '/pages/inicio',
      icon: 'paw'
    },
    {
      title: 'Sincronizar datos',
      url: '/pages/inicio',
      icon: 'cloud-upload'
    },
    {
      title: 'Ley para la defensa de animales',
      url: '/folder/Favorites',
      icon: 'library'
    },{
      title: 'Informacion',
      url: '/folder/Archived',
      icon: 'information-circle'
    },{
      title: 'Salir',
      url: '/folder/Archived',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
  }
}