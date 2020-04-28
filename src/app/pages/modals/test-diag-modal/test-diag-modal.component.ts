import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TestDiagSearchComponent } from '../test-diag-search/test-diag-search.component';
import { SubmitDiagnosticoMascota } from '../../../graphql/DiagnosticoMascota';

@Component({
  selector: 'app-test-diag-modal',
  templateUrl: './test-diag-modal.component.html',
  styleUrls: ['./test-diag-modal.component.scss'],
})
export class TestDiagModalComponent implements OnInit {

  diagnosticoform: FormGroup;
  submitted = false;
  @Input() mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private  diagnosService: SubmitDiagnosticoMascota
  ) { }

  ngOnInit() {
    this.diagnosticoform = this.fb.group({
      test_id: ['', Validators.required],
      test_name: ['', Validators.required],
      fecha_test: ['', Validators.required],
      resultado: ['', Validators.required],
      notas:['']
    });
  }
  get f() {return this.diagnosticoform.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TestDiagSearchComponent
    });
    modal.onWillDismiss().then(data=>{
      this.diagnosticoform.controls.test_id.setValue(data.data.id);
      this.diagnosticoform.controls.test_name.setValue(data.data.descripcion);
    });
    return await modal.present();
  }
  OnSubmit(){
    this.submitted = true;
    if(this.diagnosticoform.invalid) {
      return;
    } else {
      this.diagnosService.submitDiagnostico({
        test_id: this.f.test_id.value,
        mascota_id: this.mascota_id,
        fecha_test: this.f.fecha_test.value,
        resultado: this.f.resultado.value,
        notas: this.f.notas.value
      }).subscribe(data=>{
        this.modalCtrl.dismiss({
          new: data.data,
          test: {
            id: this.f.test_id.value,
            descripcion: this.f.test_name.value
          }
        })
      });
    }
  }
}
