import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CirugiaModalComponent } from '../modals/cirugia-modal/cirugia-modal.component';
import { Cirugia, CirugiasGQL } from '../../graphql/Cirugia';
import { CirugiaService } from '../../offline/cirugia';

@Component({
  selector: 'app-cirugias',
  templateUrl: './cirugias.component.html',
  styleUrls: ['./cirugias.component.scss'],
})
export class CirugiasComponent implements OnInit {

  cirugias: Cirugia[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private cirugiasQuery: CirugiasGQL,
    private CirugiaLite: CirugiaService
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.CirugiaLite.getAll(this.mascota_id)
    .then(data=>{
      this.cirugias = data;
    });
    // this.cirugiasQuery.watch({
    //   mascota_id: this.mascota_id
    // })
    // .valueChanges.subscribe(data=>{
    //   this.cirugias = data.data.CirugiaByMascota;
    // });
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: CirugiaModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // this.cirugias.push({
      //   id: data.data.new.saveCirugia.id,
      //   nombre: data.data.new.saveCirugia.nombre,
      //   fecha: data.data.new.saveCirugia.fecha,
      //   notas: data.data.new.saveCirugia.notas,
      //   tipo_cirugia: data.data.new.saveCirugia.tipo_cirugia,
      //   precio: data.data.new.saveCirugia.precio,
      //   observaciones: data.data.new.saveCirugia.observaciones
      // })
    });
    return await modal.present();
  }

}
