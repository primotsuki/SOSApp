import { Component, OnInit , Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SubmitPruebas } from '../../../graphql/pruebasDiagnostico';
@Component({
  selector: 'app-pruebas-modal',
  templateUrl: './pruebas-modal.component.html',
  styleUrls: ['./pruebas-modal.component.scss'],
})
export class PruebasModalComponent implements OnInit {

  @Input() mascota_id: number;
  pruebaForm: FormGroup;
  submitted = false;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private pruebaService: SubmitPruebas,
  ) { }

  ngOnInit() {
    this.pruebaForm = this.fb.group({
      fecha_prueba: ['', Validators.required],
      notas: [''],
      descripcion:['', Validators.required]
    })
  }
  get f(){ return this.pruebaForm.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  OnSubmit() {
    this.submitted = true;
    if(this.pruebaForm.invalid){
      return;
    } else {
      this.pruebaService.submitPrueba({
        mascota_id: this.mascota_id,
        descripcion: this.f.descripcion.value,
        fecha_prueba: this.f.fecha_prueba.value,
        notas: this.f.notas.value
      })
      .subscribe(async data=>{
        await this.modalCtrl.dismiss({
          new: data.data
        })
      });
    }
  }
}
