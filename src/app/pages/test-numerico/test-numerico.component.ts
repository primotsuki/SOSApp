import { Component, OnInit } from '@angular/core';
import {TestNumModalComponent} from '../modals/test-num-modal/test-num-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {NumericoMascota, NumericoMascotaGQL} from '../../graphql/NumericoMascota';

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
    private numericoGQL: NumericoMascotaGQL
  ) { }
  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.numericoGQL.watch({
      mascota_id: this.mascota_id
    })
    .valueChanges.subscribe(data=>{
       this.numericos = data.data.TestNumByMascota;
    })
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TestNumModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      if(data.data == undefined)
        return;
      this.numericos.push({
        id: data.data.new.saveTestNumMascota.id,
        fecha_test: data.data.new.saveTestNumMascota.fecha_test,
        notas: data.data.new.saveTestNumMascota.notas,
        valor: data.data.new.saveTestNumMascota.valor,
        margen_alto: data.data.new.saveTestNumMascota.margen_alto,
        margen_bajo: data.data.new.saveTestNumMascota.margen_bajo,
        test: {
          id: data.data.test.id,
          descripcion: data.data.test.descripcion
        },
        unidad: {
          id: data.data.unidad.id,
          unidad: data.data.unidad.unidad
        }
      })
    });
    return await modal.present();
  }

}
