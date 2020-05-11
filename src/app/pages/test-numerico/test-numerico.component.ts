import { Component, OnInit } from '@angular/core';
import {TestNumModalComponent} from '../modals/test-num-modal/test-num-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {NumericoMascota, NumericoMascotaGQL} from '../../graphql/NumericoMascota';
import { numericoMascotaService } from '../../offline/NumericoMascota';

@Component({
  selector: 'app-test-numerico',
  templateUrl: './test-numerico.component.html',
  styleUrls: ['./test-numerico.component.scss'],
})
export class TestNumericoComponent implements OnInit {

  numericos: NumericoMascota[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private numericoGQL: NumericoMascotaGQL,
    private numericoLite: numericoMascotaService
  ) { }
  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.numericoLite.getAll(this.mascota_id)
    .then(data=>{
      this.numericos = data;
    });
    // this.numericoGQL.watch({
    //   mascota_id: this.mascota_id
    // })
    // .valueChanges.subscribe(data=>{
    //    this.numericos = data.data.TestNumByMascota;
    // })
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TestNumModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // if(data.data == undefined)
      //   return;
      // this.numericos.push({
      //   id: data.data.new.saveTestNumMascota.id,
      //   fecha_test: data.data.new.saveTestNumMascota.fecha_test,
      //   notas: data.data.new.saveTestNumMascota.notas,
      //   valor: data.data.new.saveTestNumMascota.valor,
      //   margen_alto: data.data.new.saveTestNumMascota.margen_alto,
      //   margen_bajo: data.data.new.saveTestNumMascota.margen_bajo,
      //   test: {
      //     id: data.data.test.id,
      //     descripcion: data.data.test.descripcion
      //   },
      //   unidad: {
      //     id: data.data.unidad.id,
      //     unidad: data.data.unidad.unidad
      //   }
      // })
    });
    return await modal.present();
  }

}
