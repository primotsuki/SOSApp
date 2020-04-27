import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PatologiasModalComponent } from '../modals/patologias-modal/patologias-modal.component';
import { Patologia, PatologiasGQL } from '../../graphql/patologias';

@Component({
  selector: 'app-patologias',
  templateUrl: './patologias.component.html',
  styleUrls: ['./patologias.component.scss'],
})
export class PatologiasComponent implements OnInit {

  patologias: Patologia[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private patologiaQuery: PatologiasGQL
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.patologiaQuery.watch({
      mascota_id: this.mascota_id
    })
    .valueChanges.subscribe(data=>{
      this.patologias = data.data.PatologiaByMascota;
    });
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: PatologiasModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.patologias.push({
        id: data.data.new.savePatologia.id,
        nombre: data.data.new.savePatologia.nombre,
        fecha: data.data.new.savePatologia.fecha,
        notas: data.data.new.savePatologia.notas,
        acciones: data.data.new.savePatologia.acciones,
        gravedad: data.data.new.savePatologia.gravedad
      })
    });
    return await modal.present();
  }
}
