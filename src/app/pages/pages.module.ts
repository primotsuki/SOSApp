import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [PagesComponent,InicioComponent, MascotasComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    PagesRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class PagesModule { }