import { PreloadAllModules,RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MascotasComponent } from './mascotas/mascotas.component';



const routes: Routes = [{
    path: '',
    component: MascotasComponent,
    children: [
        { path: 'mascotas',
          component: MascotasComponent }
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