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
import { VacunasComponent } from './vacunas/vacunas.component';
import { VacunasModalComponent } from './modals/vacunas-modal/vacunas-modal.component';
import { SearchVacunaComponent } from './modals/search-vacuna/search-vacuna.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { MedicamentosModalComponent } from './modals/medicamentos-modal/medicamentos-modal.component';
import { MedicamentosSearchComponent } from './modals/medicamentos-search/medicamentos-search.component';
import { MedicionesListComponent } from './mediciones-list/mediciones-list.component';
import { MedicionesFillComponent } from './mediciones-fill/mediciones-fill.component';
import { MedidaModalComponent } from './modals/medida-modal/medida-modal.component';
import { AlergiasComponent } from './alergias/alergias.component';
import { PatologiasComponent } from './patologias/patologias.component';
import { PruebaDiagnosticoComponent } from './prueba-diagnostico/prueba-diagnostico.component';
import { AlergiasModalComponent } from './modals/alergias-modal/alergias-modal.component';
import { PatologiasModalComponent } from './modals/patologias-modal/patologias-modal.component';
import { PruebasModalComponent } from './modals/pruebas-modal/pruebas-modal.component';
import { TestDiagnosticoComponent } from './test-diagnostico/test-diagnostico.component';
import { TestGeneticoComponent } from './test-genetico/test-genetico.component';
import { TestNumericoComponent } from './test-numerico/test-numerico.component';
import { TestDiagModalComponent } from './modals/test-diag-modal/test-diag-modal.component';
import { TestDiagSearchComponent } from './modals/test-diag-search/test-diag-search.component';
import { TestGenModalComponent } from './modals/test-gen-modal/test-gen-modal.component';
import { TestGenSearchComponent } from './modals/test-gen-search/test-gen-search.component';
import { TestNumModalComponent } from './modals/test-num-modal/test-num-modal.component';
import { TestNumSearchComponent } from './modals/test-num-search/test-num-search.component';
import { SaludComponent } from './salud/salud.component';
import { PipesModule } from '../pipes/pipes.module';
import {MomentModule} from 'ngx-moment';
@NgModule({
  declarations: [PagesComponent,
    InicioComponent,
    MascotasComponent,
    MascotaModalComponent,
    HigieneListComponent,
    HigieneFillComponent,
    HigieneModalComponent,
    LimpiezaListComponent,
    VacunasComponent,
    VacunasModalComponent,
    SearchVacunaComponent,
    MedicamentosComponent,
    MedicamentosModalComponent,
    MedicamentosSearchComponent,
    MedicionesFillComponent,
    MedicionesListComponent,
    MedidaModalComponent,
    AlergiasComponent,
    PatologiasComponent,
    PruebaDiagnosticoComponent,
    AlergiasModalComponent,
    PatologiasModalComponent,
    PruebasModalComponent,
    SaludComponent,
    TestDiagnosticoComponent,
    TestDiagModalComponent,
    TestDiagSearchComponent,
    TestNumericoComponent,
    TestNumModalComponent,
    TestNumSearchComponent,
    TestGeneticoComponent,
    TestGenModalComponent,
    TestGenSearchComponent
  ],
  entryComponents: [
    MascotaModalComponent,
    HigieneModalComponent,
    VacunasModalComponent,
    SearchVacunaComponent,
    MedicamentosSearchComponent,
    MedicamentosModalComponent,
    MedidaModalComponent,
    AlergiasModalComponent,
    PatologiasModalComponent,
    PruebasModalComponent,
    TestDiagSearchComponent,
    TestNumSearchComponent,
    TestGenSearchComponent,
    TestDiagModalComponent,
    TestNumModalComponent,
    TestGenModalComponent
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
    }),
    PipesModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class PagesModule { }