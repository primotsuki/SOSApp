import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ComidaSearchComponent } from '../comida-search/comida-search.component';
import { SubmitComidaMascota } from '../../../graphql/ComidaMascota';

@Component({
  selector: 'app-comidas-modal',
  templateUrl: './comidas-modal.component.html',
  styleUrls: ['./comidas-modal.component.scss'],
})
export class ComidasModalComponent implements OnInit {

  comidaform: FormGroup;
  submitted = false;
  @Input() mascota_id: number;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private  comidaService: SubmitComidaMascota
  ) { }

  ngOnInit() {
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
