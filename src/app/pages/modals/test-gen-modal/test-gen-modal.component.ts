import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TestGenSearchComponent } from '../test-gen-search/test-gen-search.component';
import { SubmitGeneticoMascota } from '../../../graphql/GeneticoMascota';


@Component({
  selector: 'app-test-gen-modal',
  templateUrl: './test-gen-modal.component.html',
  styleUrls: ['./test-gen-modal.component.scss'],
})
export class TestGenModalComponent implements OnInit {

  geneticoform: FormGroup;
  submitted = false;
  @Input() mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private  geneticoService: SubmitGeneticoMascota
  ) { }

  ngOnInit() {
    this.geneticoform = this.fb.group({
      test_id: ['', Validators.required],
      test_name: ['', Validators.required],
      fecha_test: ['', Validators.required],
      resultado: ['', Validators.required],
      notas:['']
    });
  }
  get f() {return this.geneticoform.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TestGenSearchComponent
    });
    modal.onWillDismiss().then(data=>{
      this.geneticoform.controls.test_id.setValue(data.data.id);
      this.geneticoform.controls.test_name.setValue(data.data.descripcion);
    });
    return await modal.present();
  }
  OnSubmit(){
    this.submitted = true;
    if(this.geneticoform.invalid) {
      return;
    } else {
      this.geneticoService.submitGenetico({
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
