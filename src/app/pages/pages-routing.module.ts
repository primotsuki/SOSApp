import { PreloadAllModules,RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MascotasComponent } from './mascotas/mascotas.component';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { HigieneListComponent } from './higiene-list/higiene-list.component';
import { HigieneFillComponent } from './higiene-fill/higiene-fill.component';
import { LimpiezaListComponent } from './limpieza-list/limpieza-list.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        { path: 'mascotas/:id',
          component: MascotasComponent 
        },{
          path: 'inicio',
          component: InicioComponent
        },{
          path: 'mascotas/:id/higiene',
          component: HigieneListComponent
        },{
          path: 'mascotas/:id/higiene/:higiene_id/fill',
          component: HigieneFillComponent
        },{
          path: 'mascotas/:id/limpieza',
          component: LimpiezaListComponent
        },{
          path: 'mascotas/:id/limpieza/:higiene_id/fill',
          component: HigieneFillComponent
        },
    ]
}];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PagesRoutingModule{
  }