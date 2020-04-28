import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TestNumSearchComponent } from '../test-num-search/test-num-search.component';
import { SubmitNumericoMascota } from '../../../graphql/NumericoMascota';
import { TipoMedidaGQL, TipoMedicion } from '../../../graphql/tipoMedida';

@Component({
  selector: 'app-test-num-modal',
  templateUrl: './test-num-modal.component.html',
  styleUrls: ['./test-num-modal.component.scss'],
})
export class TestNumModalComponent implements OnInit {

  numericoform: FormGroup;
  submitted = false;
  @Input() mascota_id: number;
  unidades: any[];
  constructor(
    private modalCtrl: ModalController,
    private tipoQuery: TipoMedidaGQL,
    private fb: FormBuilder,
    private numericoService: SubmitNumericoMascota
  ) { }

  async ngOnInit() {
    this.numericoform = this.fb.group({
      test_id: ['', Validators.required],
      test_name: ['', Validators.required],
      fecha_test: ['', Validators.required],
      valor: ['', Validators.required],
      unidad_id:['', Validators.required],
      margen_bajo:['', Validators.required],
      margen_alto:['',Validators.required],
      notas:['']
    });
    await this.tipoQuery.watch({
      id: 4
    }).valueChanges
    .subscribe(data=>{
      const tipoMedicion = data.data.tipoMediciones[0];
      this.unidades = tipoMedicion.unidades;
    });
  }
  get f() {return this.numericoform.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TestNumSearchComponent
    });
    modal.onWillDismiss().then(data=>{
      this.numericoform.controls.test_id.setValue(data.data.id);
      this.numericoform.controls.test_name.setValue(data.data.descripcion);
    });
    return await modal.present();
  }
  OnSubmit(){
    this.submitted = true;
    if(this.numericoform.invalid) {
      return;
    } else {
      this.numericoService.submitNumerico({
        test_id: this.f.test_id.value,
        mascota_id: this.mascota_id,
        fecha_test: this.f.fecha_test.value,
        valor: parseInt(this.f.valor.value),
        margen_alto: parseInt(this.f.margen_alto.value),
        margen_bajo: parseInt(this.f.margen_bajo.value),
        unidad_id: this.f.unidad_id.value,
        notas: this.f.notas.value
      }).subscribe( async data=>{
        this.modalCtrl.dismiss({
          new: data.data,
          test: {
            id: this.f.test_id.value,
            descripcion: this.f.test_name.value
          },
          unidad: await this.unidades.filter(elem=>{return elem.id ==this.f.unidad_id.value})[0]
        })
      });
    }
  }

}
