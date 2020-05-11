import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TipoMedidaGQL, TipoMedicion } from '../../../graphql/tipoMedida';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SubmitMedidaMascota } from '../../../graphql/MedidaMascota';
import { MedicionMascotaService } from '../../../offline/Mediciones';
import { UnidadesService } from '../../../offline/unidades';

@Component({
  selector: 'app-medida-modal',
  templateUrl: './medida-modal.component.html',
  styleUrls: ['./medida-modal.component.scss'],
})
export class MedidaModalComponent implements OnInit {

  @Input() mascota_id: number;
  @Input() medicion_id: number;
  medidaForm: FormGroup;
  tipoMedicion: TipoMedicion;
  unidades: any[];
  submitted = false;
  constructor(
    private modalCtrl: ModalController,
    private tipoQuery: TipoMedidaGQL,
    private fb: FormBuilder,
    private medidaService: SubmitMedidaMascota,
    private medidaLite: MedicionMascotaService,
    private unidadesLite: UnidadesService
  ) { }

  ngOnInit() {
    this.tipoQuery.watch({
      id: this.medicion_id
    }).valueChanges
    .subscribe(data=>{
      this.tipoMedicion = data.data.tipoMediciones[0];
      this.unidades = this.tipoMedicion.unidades;
      this.unidadesLite.saveData(this.unidades);
    }, error=>{
      this.unidadesLite.getAll(this.medicion_id)
      .then(data=>{
        this.tipoMedicion = data;
      this.unidades = this.tipoMedicion.unidades;
      })
    });
    this.medidaForm = this.fb.group({
      fecha_medida: ['', Validators.required],
      unidad_id: ['', Validators.required],
      valor: ['', Validators.required],
      notas: ['']
    });
  }
  get f(){ return this.medidaForm.controls};

  async close() {
    await this.modalCtrl.dismiss();
  }
  OnSubmit() {
    this.submitted = true;
    if(this.medidaForm.invalid){
      return;
    } else {
      let medida = {
        medicion_id: this.medicion_id,
        mascota_id: this.mascota_id,
        valor: parseInt(this.f.valor.value),
        unidad_id: this.f.unidad_id.value,
        fecha_medicion: this.f.fecha_medida.value,
        notas: this.f.notas.value,
        submitted: false
      };
      this.medidaLite.newmedicion(medida)
      .then(data=>{
        this.modalCtrl.dismiss({
          submitted: true
        })
      });
      // this.medidaService.submitMedicion(medida)
      // .subscribe(async data=>{
      //   await this.modalCtrl.dismiss({
      //     new: data.data,
      //     unidad: await this.unidades.filter(elem=>{return elem.id ==this.f.unidad_id.value})[0]
      //   })
      // });
    }
  }
}
