import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SearchVacunaComponent } from '../search-vacuna/search-vacuna.component';
import { SubmitVacunaMascota } from '../../../graphql/VacunaMascota';

@Component({
  selector: 'app-vacunas-modal',
  templateUrl: './vacunas-modal.component.html',
  styleUrls: ['./vacunas-modal.component.scss'],
})
export class VacunasModalComponent implements OnInit {

  vacunaform: FormGroup;
  submitted = false;
  @Input() mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private  VacunaService: SubmitVacunaMascota
  ) { }

  ngOnInit() {
    this.vacunaform = this.fb.group({
      vacuna_id: ['', Validators.required],
      vacuna_name: ['', Validators.required],
      fecha_vacuna: ['', Validators.required],
      recordatorio: [true, Validators.required],
      realizado: [false, Validators.required],
      notas:['']
    });
  }
  get f() {return this.vacunaform.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: SearchVacunaComponent
    });
    modal.onWillDismiss().then(data=>{
      this.vacunaform.controls.vacuna_id.setValue(data.data.id);
      this.vacunaform.controls.vacuna_name.setValue(data.data.descripcion);
    });
    return await modal.present();
  }
  OnSubmit(){
    this.submitted = true;
    if(this.vacunaform.invalid) {
      return;
    } else {
      this.VacunaService.submitVacuna({
        vacuna_id: this.f.vacuna_id.value,
        mascota_id: this.mascota_id,
        fecha_vacuna: this.f.fecha_vacuna.value,
        recordatorio: this.f.recordatorio.value,
        realizado: this.f.realizado.value,
        notas: this.f.notas.value
      }).subscribe(data=>{
        this.modalCtrl.dismiss({
          new: data.data,
          vacuna: {
            id: this.f.vacuna_id.value,
            descripcion: this.f.vacuna_name.value
          }
        })
      });
    }
  }
}
