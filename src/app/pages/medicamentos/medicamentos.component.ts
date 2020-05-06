import { Component, OnInit } from '@angular/core';
import {MedicamentosModalComponent} from '../modals/medicamentos-modal/medicamentos-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {MedicamentoMascota,MedicamentosMascota} from '../../graphql/medicamentoMascota';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.scss'],
})
export class MedicamentosComponent implements OnInit {

  medicamentos: MedicamentoMascota[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private medicionQuery: MedicamentosMascota
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.medicionQuery.watch({
      mascota_id: this.mascota_id
    })
    .valueChanges.subscribe(data=>{
       this.medicamentos = data.data.medicamentoByMascota;
    })
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MedicamentosModalComponent,
      componentProps: {
        edit: false,
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.medicamentos.push({
        id: data.data.new.saveMedicamentoMascota.id,
        fecha_medicamento: data.data.new.saveMedicamentoMascota.fecha_medicamento,
        notas: data.data.new.saveMedicamentoMascota.notas,
        recordatorio: data.data.new.saveMedicamentoMascota.recordatorio,
        realizado: data.data.new.saveMedicamentoMascota.realizado,
        medicamento: {
          id: data.data.medicamento.id,
          descripcion: data.data.medicamento.descripcion
        }
      })
    });
    return await modal.present();
  }
  async editElem(medicamento: any) {
    const modal = await this.modalCtrl.create({
      component: MedicamentosModalComponent,
      componentProps: {
        edit: true,
        medicamento: medicamento
      }
    });
    modal.onWillDismiss().then(data=>{
      let index = this.medicamentos.findIndex(elem =>{
        return elem.id = data.data.id
      })
      this.medicamentos[index]=data.data;
    });
    return await modal.present();
  }
}
