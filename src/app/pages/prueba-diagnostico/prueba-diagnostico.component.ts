import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PruebasModalComponent } from '../modals/pruebas-modal/pruebas-modal.component';
import { Prueba, PruebasGQL } from '../../graphql/pruebasDiagnostico';
import { pruebaService } from '../../offline/Prueba';
@Component({
  selector: 'app-prueba-diagnostico',
  templateUrl: './prueba-diagnostico.component.html',
  styleUrls: ['./prueba-diagnostico.component.scss'],
})
export class PruebaDiagnosticoComponent implements OnInit {

  pruebas: Prueba[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private pruebaQuery: PruebasGQL,
    private pruebaLite: pruebaService
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.pruebaLite.getAll(this.mascota_id)
    .then(data=>{
      this.pruebas = data
    })
    // this.pruebaQuery.watch({
    //   mascota_id: this.mascota_id
    // })
    // .valueChanges.subscribe(data=>{
    //   this.pruebas = data.data.PruebaByMascota;
    // });
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: PruebasModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // this.pruebas.push({
      //   id: data.data.new.savePrueba.id,
      //   fecha_prueba: data.data.new.savePrueba.fecha_prueba,
      //   notas: data.data.new.savePrueba.notas,
      //   descripcion: data.data.new.savePrueba.descripcion,
      // })
    });
    return await modal.present();
  }
}
