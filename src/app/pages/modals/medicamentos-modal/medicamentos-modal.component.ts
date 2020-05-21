import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MedicamentosSearchComponent } from '../medicamentos-search/medicamentos-search.component';
import { SubmitMedicamentoMascota, EditMedicamentoMascota } from '../../../graphql/medicamentoMascota';
import * as moment from 'moment';
import { MedicamentoMascotaService } from '../../../offline/medicamentoMascota';
@Component({
  selector: 'app-medicamentos-modal',
  templateUrl: './medicamentos-modal.component.html',
  styleUrls: ['./medicamentos-modal.component.scss'],
})
export class MedicamentosModalComponent implements OnInit {

  medicamentoform: FormGroup;
  submitted = false;
  @Input() mascota_id: number;
  @Input() edit: boolean;
  @Input() medicamento: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private  medicamentoService: SubmitMedicamentoMascota,
    private EditService: EditMedicamentoMascota,
    private medicamentoLite: MedicamentoMascotaService
  ) { }

  ngOnInit() {
    if(this.edit){
      this.medicamentoform = this.fb.group({
        medicamento_id: [this.medicamento.medicamento.id],
        medicamento_name: [this.medicamento.medicamento.descripcion],
        fecha_medicamento: [moment(this.medicamento.fecha_medicamento).format('YYYY-MM-DD')],
        recordatorio: [this.medicamento.recordatorio],
        realizado: [this.medicamento.realizado],
        notas:[this.medicamento.notas]
      });
    } else {
      this.medicamentoform = this.fb.group({
        medicamento_id: ['', Validators.required],
        medicamento_name: ['', Validators.required],
        fecha_medicamento: ['', Validators.required],
        recordatorio: [true, Validators.required],
        realizado: [false, Validators.required],
        notas:['']
      });
    }
  }
  get f() {return this.medicamentoform.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MedicamentosSearchComponent
    });
    modal.onWillDismiss().then(data=>{
      this.medicamentoform.controls.medicamento_id.setValue(data.data.id);
      this.medicamentoform.controls.medicamento_name.setValue(data.data.descripcion);
    });
    return await modal.present();
  }
  OnSubmit(){
    this.submitted = true;
    if(this.medicamentoform.invalid) {
      return;
    } else {
      if(this.edit){
        let medicamento = {
          id: this.medicamento.id,
          medicamento_id: this.f.medicamento_id.value,
          fecha_medicamento: this.f.fecha_medicamento.value,
          recordatorio: this.f.recordatorio.value,
          realizado: this.f.realizado.value,
          notas: this.f.notas.value
        }
        this.medicamentoLite.updatemedicamento(medicamento)
        .then(data=>{
          this.modalCtrl.dismiss({
            submitted: true
          });
        })
        // this.EditService.EditMedicamento(medicamento).subscribe(data=>{
        //   this.modalCtrl.dismiss({
        //     id: this.medicamento.id,
        //     fecha_medicamento: moment(new Date(this.f.fecha_medicamento.value)).unix()*1000,
        //     recordatorio: this.f.recordatorio.value,
        //     realizado: this.f.realizado.value,
        //     notas: this.f.notas.value,
        //     medicamento:{
        //       id: this.f.medicamento_id.value,
        //       descripcion: this.f.medicamento_name.value
        //     }
        //   })
        // })
      } else {
        let medicamentos = {
          medicamento_id: this.f.medicamento_id.value,
          mascota_id: this.mascota_id,
          fecha_medicamento: this.f.fecha_medicamento.value,
          recordatorio: this.f.recordatorio.value,
          realizado: this.f.realizado.value,
          notas: this.f.notas.value
        };
        this.medicamentoLite.newMedicamento(medicamentos)
        .then(data=>{
          this.modalCtrl.dismiss({
            submitted: true
          });
        })
        // this.medicamentoService.submitmedicamento(medicamentos).subscribe(data=>{
        //   this.modalCtrl.dismiss({
        //     new: data.data,
        //     medicamento: {
        //       id: this.f.medicamento_id.value,
        //       descripcion: this.f.medicamento_name.value
        //     }
        //   })
        // });
      }
    }
  }
}
