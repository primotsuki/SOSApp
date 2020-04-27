import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { submitMantenimiento } from '../../../graphql/mantenimientoMascota';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-higiene-modal',
  templateUrl: './higiene-modal.component.html',
  styleUrls: ['./higiene-modal.component.scss'],
})
export class HigieneModalComponent implements OnInit {

  @Input() mascota_id: number;
  @Input() manten_id:number;
  @Input() manten_desc: string;
  higieneForm: FormGroup;
  submitted = false;
  mantenimiento: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private mantenService: submitMantenimiento,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.higieneForm = this.fb.group({
      fecha_mantenimiento: ['', Validators.required],
      recordatorio: [true],
      realizado: [false],
      proximo: [''],
      num_prog:['1'],
      intervalo_prog:['dias'],
      programado:[true],
      notas:['']
    });
  }
  get f() {return this.higieneForm.controls};

  async close() {
    await this.modalCtrl.dismiss({
      completed: false
    });
  }
  OndateChange(e){
    let prox = moment(this.f.fecha_mantenimiento.value);
    switch (this.f.intervalo_prog.value) {
      case 'dias' : {
        this.higieneForm.controls.proximo.setValue(prox.add(this.f.num_prog.value,'days').format('YYYY-MM-DD'));
        break;
      }
      case 'meses' : {
        this.higieneForm.controls.proximo.setValue(prox.add(this.f.num_prog.value,'months').format('YYYY-MM-DD'));
        break;
      }
      case 'semanas':{
        this.higieneForm.controls.proximo.setValue(prox.add(this.f.num_prog.value,'weeks').format('YYYY-MM-DD'));
        break;
      }
    }
  }
  OnSubmit(){
    this.submitted = true;
    if(this.higieneForm.invalid) {
      return;
    } else {
      this.mantenService.submitManten({
        fecha_mantenimiento: this.f.fecha_mantenimiento.value,
        recordatorio: this.f.recordatorio.value,
        realizado: this.f.realizado.value,
        proximo: this.f.proximo.value,
        num_prog: parseInt(this.f.num_prog.value),
        intervalo_prog: this.f.intervalo_prog.value,
        programado: this.f.programado.value,
        notas: this.f.notas.value,
        mascota_id: this.mascota_id,
       mantenimiento_id: this.manten_id 
      }).subscribe(data=>{
        this.modalCtrl.dismiss({
          completed: true
        })
      })
    }
  }

}