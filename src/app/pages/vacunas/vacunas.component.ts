import { Component, OnInit } from '@angular/core';
import {VacunasModalComponent} from '../modals/vacunas-modal/vacunas-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {VacunaMascota,VacunasMascota} from '../../graphql/VacunaMascota';
import { VacunaMascotaService } from '../../offline/VacunaMascota';

@Component({
  selector: 'app-vacunas',
  templateUrl: './vacunas.component.html',
  styleUrls: ['./vacunas.component.scss'],
})
export class VacunasComponent implements OnInit {

  vacunasMascota: VacunaMascota[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private vacunaQuery: VacunasMascota,
    private vacunaLite: VacunaMascotaService
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.vacunaLite.getAll(this.mascota_id)
    .then(data=>{
      this.vacunasMascota = data;
    });
    // this.vacunaQuery.watch({
    //   mascota_id: this.mascota_id
    // })
    // .valueChanges.subscribe(data=>{
    //    this.vacunasMascota = data.data.vacunaByMascota;
    // })
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: VacunasModalComponent,
      componentProps: {
        edit: false,
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // this.vacunasMascota.push({
      //   id: data.data.new.saveVacunaMascota.id,
      //   fecha_vacuna: data.data.new.saveVacunaMascota.fecha_vacuna,
      //   notas: data.data.new.saveVacunaMascota.notas,
      //   recordatorio: data.data.new.saveVacunaMascota.recordatorio,
      //   realizado: data.data.new.saveVacunaMascota.realizado,
      //   vacuna: {
      //     id: data.data.vacuna.id,
      //     descripcion: data.data.vacuna.descripcion
      //   }
      // })
    });
    return await modal.present();
  }
  async editElem(vacuna: any) {
    const modal = await this.modalCtrl.create({
      component: VacunasModalComponent,
      componentProps: {
        edit: true,
        vacuna: vacuna
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // let index = this.vacunasMascota.findIndex(elem =>{
      //   return elem.id = data.data.id
      // })
      // this.vacunasMascota[index]=data.data;
    });
    return await modal.present();
  }
}
