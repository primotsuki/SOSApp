import { PreloadAllModules,RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MascotasComponent } from './mascotas/mascotas.component';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
        { path: 'mascotas',
          component: MascotasComponent 
        },{
          path: 'inicio',
          component: InicioComponent
        }
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