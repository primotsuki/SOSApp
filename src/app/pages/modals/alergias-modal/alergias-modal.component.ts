import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SubmitAlergias } from '../../../graphql/alergias';
import { AlergiaService } from '../../../offline/alergias';
@Component({
  selector: 'app-alergias-modal',
  templateUrl: './alergias-modal.component.html',
  styleUrls: ['./alergias-modal.component.scss'],
})
export class AlergiasModalComponent implements OnInit {

  @Input() mascota_id: number;
  alergiaForm: FormGroup;
  submitted = false;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private alergiasService: SubmitAlergias,
    private alergiaLite: AlergiaService
  ) { }

  ngOnInit() {
    this.alergiaForm = this.fb.group({
      fecha_diagnostico: ['', Validators.required],
      nombre:['', Validators.required],
      notas: [''],
      categoria: ['', Validators.required],
      gravedad:['', Validators.required],
    });
  }
  get f(){ return this.alergiaForm.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  OnSubmit() {
    this.submitted = true;
    if(this.alergiaForm.invalid){
      return;
    } else {
      let alergia = {
        mascota_id: this.mascota_id,
        fecha_diagnostico: this.f.fecha_diagnostico.value,
        nombre: this.f.nombre.value,
        notas: this.f.notas.value,
        categoria: this.f.categoria.value,
        gravedad: this.f.gravedad.value
      };
      this.alergiaLite.newAlergia(alergia)
      .then(data=>{
        console.log(data);
        this.modalCtrl.dismiss({
          completed: true
        });
      })
      // this.alergiasService.submitAlergia(alergia)
      // .subscribe(async data=>{
      //   await this.modalCtrl.dismiss({
      //     new: data.data
      //   })
      // });
    }
  }
}
