import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SubmitPatologias } from '../../../graphql/patologias';

@Component({
  selector: 'app-patologias-modal',
  templateUrl: './patologias-modal.component.html',
  styleUrls: ['./patologias-modal.component.scss'],
})
export class PatologiasModalComponent implements OnInit {

  @Input() mascota_id: number;
  patologiaForm: FormGroup;
  submitted = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private patologiasService: SubmitPatologias,
  ) { }

  ngOnInit() {
    this.patologiaForm = this.fb.group({
      fecha: ['', Validators.required],
      nombre:['', Validators.required],
      notas: [''],
      acciones: ['', Validators.required],
      gravedad:['', Validators.required],
    });
  }
  get f(){ return this.patologiaForm.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  OnSubmit() {
    this.submitted = true;
    if(this.patologiaForm.invalid){
      return;
    } else {
      this.patologiasService.submitPatologia({
        mascota_id: this.mascota_id,
        fecha: this.f.fecha.value,
        nombre: this.f.nombre.value,
        notas: this.f.notas.value,
        acciones: this.f.acciones.value,
        gravedad: this.f.gravedad.value
      })
      .subscribe(async data=>{
        await this.modalCtrl.dismiss({
          new: data.data
        })
      });
    }
  }
}
