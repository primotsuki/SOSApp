import { PreloadAllModules,RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MascotasComponent } from './mascotas/mascotas.component';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { HigieneListComponent } from './higiene-list/higiene-list.component';
import { HigieneFillComponent } from './higiene-fill/higiene-fill.component';
import { LimpiezaListComponent } from './limpieza-list/limpieza-list.component';
import { VacunasComponent } from './vacunas/vacunas.component';
import { MedicionesListComponent } from './mediciones-list/mediciones-list.component';
import { MedicionesFillComponent } from './mediciones-fill/mediciones-fill.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { AlergiasComponent } from './alergias/alergias.component';
import { PatologiasComponent } from './patologias/patologias.component';
import { PruebaDiagnosticoComponent } from './prueba-diagnostico/prueba-diagnostico.component';
import { SaludComponent } from './salud/salud.component';
import { TestDiagnosticoComponent } from './test-diagnostico/test-diagnostico.component';
import { TestGeneticoComponent } from './test-genetico/test-genetico.component';
import { TestNumericoComponent } from './test-numerico/test-numerico.component';

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
        },{
          path: 'mascotas/:id/vacuna',
          component: VacunasComponent
        },{
          path: 'mascotas/:id/medicamentos',
          component: MedicamentosComponent
        },{
          path: 'mascotas/:id/medicion',
          component: MedicionesListComponent
        },{
          path: 'mascotas/:id/medicion/:med_id/fill',
          component: MedicionesFillComponent
        },{
          path: 'mascotas/:id/salud',
          component: SaludComponent
        },{
          path: 'mascotas/:id/salud/pruebas',
          component: PruebaDiagnosticoComponent
        },{
          path: 'mascotas/:id/salud/patologias',
          component: PatologiasComponent
        }, {
          path: 'mascotas/:id/salud/alergias',
          component: AlergiasComponent
        },{
          path: 'mascotas/:id/salud/diagnostico',
          component: TestDiagnosticoComponent
        },{
          path: 'mascotas/:id/salud/genetico',
          component: TestGeneticoComponent
        },{
          path: 'mascotas/:id/salud/numerico',
          component: TestNumericoComponent
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