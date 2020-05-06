import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ComidaSearchComponent } from '../comida-search/comida-search.component';
import { SubmitComidaMascota, EditComidaMascota } from '../../../graphql/ComidaMascota';
import * as moment from 'moment';

@Component({
  selector: 'app-comidas-modal',
  templateUrl: './comidas-modal.component.html',
  styleUrls: ['./comidas-modal.component.scss'],
})
export class ComidasModalComponent implements OnInit {

  comidaform: FormGroup;
  submitted = false;
  @Input() mascota_id: number;
  @Input() edit: boolean;
  @Input() comida: any;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private comidaService: SubmitComidaMascota,
    private editService: EditComidaMascota
  ) { }

  ngOnInit() {
    if(this.edit) {
      this.comidaform = this.fb.group({
        suministro_id: [this.comida.suministro.id],
        suministro_name: [this.comida.suministro.descripcion],
        fecha_comida: [moment(parseInt(this.comida.fecha_comida)).format('YYYY-MM-DD')],
        recordatorio: [this.comida.recordatorio],
        cantidad: [this.comida.cantidad],
        medida:[this.comida.medida],
        hora_recordatorio:[this.comida.hora_recordatorio],
        notas:[this.comida.notas]
      });
    } else {
      this.comidaform = this.fb.group({
        suministro_id: ['', Validators.required],
        suministro_name: ['', Validators.required],
        fecha_comida: ['', Validators.required],
        recordatorio: [true, Validators.required],
        cantidad: ['', Validators.required],
        medida:['',Validators.required],
        hora_recordatorio:['', Validators.required],
        notas:['']
      });
    }
  }
  get f() {return this.comidaform.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ComidaSearchComponent
    });
    modal.onWillDismiss().then(data=>{
      this.comidaform.controls.suministro_id.setValue(data.data.id);
      this.comidaform.controls.suministro_name.setValue(data.data.descripcion);
    });
    return await modal.present();
  }
  OnSubmit(){
    this.submitted = true;
    if(this.comidaform.invalid) {
      return;
    } else {
      if(this.edit){
        this.editService.EditComida({
          id: this.comida.id,
          suministro_id: this.f.suministro_id.value,
          fecha_comida: this.f.fecha_comida.value,
          recordatorio: this.f.recordatorio.value,
          cantidad: parseInt(this.f.cantidad.value),
          medida: this.f.medida.value,
          hora_recordatorio: this.f.hora_recordatorio.value,
          notas: this.f.notas.value
        }).subscribe(data=>{
          this.modalCtrl.dismiss({
          id: this.comida.id,
          fecha_comida: moment(new Date(this.f.fecha_comida.value)).unix()*1000,
          recordatorio: this.f.recordatorio.value,
          cantidad: parseInt(this.f.cantidad.value),
          medida: this.f.medida.value,
          hora_recordatorio: this.f.hora_recordatorio.value,
          notas: this.f.notas.value,
          suministro: {
            id: this.f.suministro_id.value,
            descripcion: this.f.suministro_name.value
          }
          })
        })
      } else {
        this.comidaService.submitComida({
          suministro_id: this.f.suministro_id.value,
          mascota_id: this.mascota_id,
          fecha_comida: this.f.fecha_comida.value,
          recordatorio: this.f.recordatorio.value,
          cantidad: parseInt(this.f.cantidad.value),
          medida: this.f.medida.value,
          hora_recordatorio: this.f.hora_recordatorio.value,
          notas: this.f.notas.value
        }).subscribe(data=>{
          this.modalCtrl.dismiss({
            new: data.data,
            suministro: {
              id: this.f.suministro_id.value,
              descripcion: this.f.suministro_name.value
            }
          })
        });
      }
    }
  }

}
