import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SubmitCirugias } from '../../../graphql/Cirugia';
import { CirugiaService } from '../../../offline/cirugia';

@Component({
  selector: 'app-cirugia-modal',
  templateUrl: './cirugia-modal.component.html',
  styleUrls: ['./cirugia-modal.component.scss'],
})
export class CirugiaModalComponent implements OnInit {

  @Input() mascota_id: number;
  cirugiaForm: FormGroup;
  submitted = false;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private cirugiaService: SubmitCirugias,
    private cirugiaLite: CirugiaService
  ) { }

  ngOnInit() {
    this.cirugiaForm = this.fb.group({
      fecha: ['', Validators.required],
      nombre:['', Validators.required],
      notas: [''],
      tipo_cirugia: ['', Validators.required],
      precio:['', Validators.required],
      observaciones: ['', Validators.required]
    });
  }
  get f(){ return this.cirugiaForm.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  OnSubmit() {
    this.submitted = true;
    if(this.cirugiaForm.invalid){
      return;
    } else {
      let cir = {
        mascota_id: this.mascota_id,
        fecha: this.f.fecha.value,
        nombre: this.f.nombre.value,
        notas: this.f.notas.value,
        tipo_cirugia: this.f.tipo_cirugia.value,
        observaciones: this.f.observaciones.value,
        precio: parseInt(this.f.precio.value),
        submitted: false
      };
      this.cirugiaLite.newCirugia(cir)
      .then(data=>{
        this.modalCtrl.dismiss({
          submitted: true
        })
      })
      // this.cirugiaService.submitCirugia( cir)
      // .subscribe(async data=>{
      //   await this.modalCtrl.dismiss({
      //     new: data.data
      //   })
      // });
    }
  }

}
