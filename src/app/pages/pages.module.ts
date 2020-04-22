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
import { MascotaModalComponent } from './modals/mascota-modal/mascota-modal.component';
import { HigieneListComponent } from './higiene-list/higiene-list.component';
import { HigieneFillComponent } from './higiene-fill/higiene-fill.component';
import { HigieneModalComponent } from './modals/higiene-modal/higiene-modal.component';
import { LimpiezaListComponent } from './limpieza-list/limpieza-list.component';

import {MomentModule} from 'ngx-moment';
@NgModule({
  declarations: [PagesComponent,
    InicioComponent,
    MascotasComponent,
    MascotaModalComponent,
    HigieneListComponent,
    HigieneFillComponent,
    HigieneModalComponent,
    LimpiezaListComponent ],
  entryComponents: [
    MascotaModalComponent,
    HigieneModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    PagesRoutingModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class PagesModule { }