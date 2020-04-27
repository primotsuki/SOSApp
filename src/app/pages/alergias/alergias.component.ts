import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlergiasModalComponent } from '../modals/alergias-modal/alergias-modal.component';
import { Alergia, AlergiasGQL } from '../../graphql/alergias';

@Component({
  selector: 'app-alergias',
  templateUrl: './alergias.component.html',
  styleUrls: ['./alergias.component.scss'],
})
export class AlergiasComponent implements OnInit {

  alergias: Alergia[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private alergiasQuery: AlergiasGQL
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.alergiasQuery.watch({
      mascota_id: this.mascota_id
    })
    .valueChanges.subscribe(data=>{
      this.alergias = data.data.AlergiaByMascota;
    });
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: AlergiasModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.alergias.push({
        id: data.data.new.saveAlergia.id,
        nombre: data.data.new.saveAlergia.nombre,
        fecha_diagnostico: data.data.new.saveAlergia.fecha_diagnostico,
        notas: data.data.new.saveAlergia.notas,
        categoria: data.data.new.saveAlergia.categoria,
        gravedad: data.data.new.saveAlergia.gravedad
      })
    });
    return await modal.present();
  }
}
