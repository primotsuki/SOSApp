import { Component, OnInit } from '@angular/core';
import {ComidasModalComponent} from '../modals/comidas-modal/comidas-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {ComidaMascota, ComidaMascotaGQL } from '../../graphql/ComidaMascota';


@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.scss'],
})
export class ComidasComponent implements OnInit {

  comidas: ComidaMascota[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private comidaQuery: ComidaMascotaGQL
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.comidaQuery.watch({
      mascota_id: this.mascota_id
    })
    .valueChanges.subscribe(data=>{
       this.comidas = data.data.ComidaByMascota;
    })
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ComidasModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      console.log(data);
      this.comidas.push({
        id: data.data.new.saveComidaMascota.id,
        fecha_comida: data.data.new.saveComidaMascota.fecha_comida,
        notas: data.data.new.saveComidaMascota.notas,
        cantidad: data.data.new.saveComidaMascota.cantidad,
        medida: data.data.new.saveComidaMascota.medida,
        recordatorio: data.data.new.saveComidaMascota.recordatorio,
        hora_recordatorio: data.data.new.saveComidaMascota.hora_recordatorio,
        suministro: {
          id: data.data.suministro.id,
          descripcion: data.data.suministro.descripcion
        }
      })
    });
    return await modal.present();
  }
  async EditElem(comida: any) {
    const modal = await this.modalCtrl.create({
      component: ComidasModalComponent,
      componentProps: {
        edit: true,
        comida: comida
      }
    });
    modal.onWillDismiss().then(data=>{
      let index = this.comidas.findIndex(elem =>{
        return elem.id = data.data.id
      })
      this.comidas[index]=data.data;
    });
    return await modal.present();
  }

}
