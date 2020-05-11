import { Component, OnInit } from '@angular/core';
import { MedidaModalComponent } from '../modals/medida-modal/medida-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MedicionMascota,Medidas } from '../../graphql/MedidaMascota';
import { MedicionMascotaService } from '../../offline/Mediciones';

@Component({
  selector: 'app-mediciones-fill',
  templateUrl: './mediciones-fill.component.html',
  styleUrls: ['./mediciones-fill.component.scss'],
})
export class MedicionesFillComponent implements OnInit {

  mascota_id: number;
  medicion_id: number;
  medidas: Medidas[];
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private medicionQuery: MedicionMascota,
    private medicionLite: MedicionMascotaService
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
      this.medicion_id = params.med_id;
    });
    this.medicionLite.getAll(this.mascota_id, this.medicion_id)
    .then(data=>{
      this.medidas = data;
    });
    // this.medicionQuery.watch({
    //   mascota_id: this.mascota_id,
    //   medicion_id: this.medicion_id
    // })
    // .valueChanges.subscribe(data=>{
    //   this.medidas = data.data.MedicionesByMascota;
    //   console.log(this.medidas);
    // });
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MedidaModalComponent,
      componentProps: {
        mascota_id: this.mascota_id,
        medicion_id: this.medicion_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // console.log(data);
      // this.medidas.push({
      //   id: data.data.new.saveMedicionMascota.id,
      //   fecha_medicion: data.data.new.saveMedicionMascota.fecha_medicion,
      //   notas: data.data.new.saveMedicionMascota.notas,
      //   valor: data.data.new.saveMedicionMascota.valor,
      //   unidad: data.data.unidad,
      //   tipo_medicion: {
      //     id: 1,
      //     descripcion: 'ninguna'
      //   }
      // })
    });
    return await modal.present();
  }
}
