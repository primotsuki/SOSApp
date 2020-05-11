import { Component, OnInit } from '@angular/core';
import {TestDiagModalComponent} from '../modals/test-diag-modal/test-diag-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {DiagnosticoMascota, DiagnosticoMascotaGQL } from '../../graphql/DiagnosticoMascota';
import { diagnosMascotaService } from '../../offline/diagnosticoMascota';

@Component({
  selector: 'app-test-diagnostico',
  templateUrl: './test-diagnostico.component.html',
  styleUrls: ['./test-diagnostico.component.scss'],
})
export class TestDiagnosticoComponent implements OnInit {

  diagnosticos: DiagnosticoMascota[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private diagQuery: DiagnosticoMascotaGQL,
    private diagnosticoLite: diagnosMascotaService
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.diagnosticoLite.getAll(this.mascota_id)
    .then(data=>{
      this.diagnosticos = data;
    })
    // this.diagQuery.watch({
    //   mascota_id: this.mascota_id
    // })
    // .valueChanges.subscribe(data=>{
    //    this.diagnosticos = data.data.testDiagByMascota;
    // })
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TestDiagModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // console.log(data);
      // this.diagnosticos.push({
      //   id: data.data.new.saveTestDiagByMascota.id,
      //   fecha_test: data.data.new.saveTestDiagByMascota.fecha_test,
      //   notas: data.data.new.saveTestDiagByMascota.notas,
      //   resultado: data.data.new.saveTestDiagByMascota.resultado,
      //   test: {
      //     id: data.data.test.id,
      //     descripcion: data.data.test.descripcion
      //   }
      // })
    });
    return await modal.present();
  }
}
