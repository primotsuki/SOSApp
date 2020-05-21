import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { submitMantenimiento, EditMantenimiento } from '../../../graphql/mantenimientoMascota';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import { MantenimientoMascotaService } from '../../../offline/mantenimiento';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import { ELocalNotificationTriggerUnit } from "@ionic-native/local-notifications/index";
@Component({
  selector: 'app-higiene-modal',
  templateUrl: './higiene-modal.component.html',
  styleUrls: ['./higiene-modal.component.scss'],
})
export class HigieneModalComponent implements OnInit {

  @Input() mascota_id: number;
  @Input() manten_id:number;
  @Input() manten_desc: string;
  @Input() manten : any;
  @Input() edit: Boolean;
  higieneForm: FormGroup;
  submitted = false;
  mantenimiento: any;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private mantenService: submitMantenimiento,
    private editService: EditMantenimiento,
    private route: ActivatedRoute,
    private mantenimientoMascota: MantenimientoMascotaService,
    private localNotifications: LocalNotifications
  ) { }

  ngOnInit() {
    if(this.edit){
      this.higieneForm = this.fb.group({
        fecha_mantenimiento: [moment(this.manten.fecha_mantenimiento).format('YYYY-MM-DD')],
        recordatorio: [this.manten.recordatorio],
        realizado: [this.manten.realizado],
        proximo: [moment(this.manten.proximo).format('YYYY-MM-DD')],
        num_prog:[this.manten.num_prog.toString()],
        intervalo_prog:[this.manten.intervalo_prog],
        programado:[this.manten.programado],
        notas:[this.manten.notas]
      });
    } else {
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
      let frecuency: ELocalNotificationTriggerUnit = ELocalNotificationTriggerUnit.MINUTE;
          switch (this.f.intervalo_prog.value){
            case 'dias':
              frecuency = ELocalNotificationTriggerUnit.DAY;
              break;
            case 'semanas':
              frecuency = ELocalNotificationTriggerUnit.WEEK;
              break;
            case 'meses':
              frecuency = ELocalNotificationTriggerUnit.MONTH;
              break;

          }
      if(this.edit) {
        let manten = {
          id: this.manten.id,
          fecha_mantenimiento: this.f.fecha_mantenimiento.value,
          recordatorio: this.f.recordatorio.value,
          realizado: this.f.realizado.value,
          proximo: this.f.proximo.value,
          num_prog: parseInt(this.f.num_prog.value),
          intervalo_prog: this.f.intervalo_prog.value,
          programado: this.f.programado.value,
          notas: this.f.notas.value,
          submitted: false
        };
        this.mantenimientoMascota.updatemanten(manten)
        .then(data=>{
          this.localNotifications.schedule({
            title: 'Se requiere la tarea '+this.manten_desc,
            trigger: { every: frecuency}
          });
          this.modalCtrl.dismiss({
            submitted: true
          });
        })
        // this.editService.editManten(manten).subscribe(data=>{
        //   this.modalCtrl.dismiss({
        //     new: data.data
        //   })
        // });
      } else {
        let manten = {
          fecha_mantenimiento: this.f.fecha_mantenimiento.value,
          recordatorio: this.f.recordatorio.value,
          realizado: this.f.realizado.value,
          proximo: this.f.proximo.value,
          num_prog: parseInt(this.f.num_prog.value),
          intervalo_prog: this.f.intervalo_prog.value,
          programado: this.f.programado.value,
          notas: this.f.notas.value,
          mascota_id: this.mascota_id,
          mantenimiento_id: this.manten_id,
          submitted: false 
        };
        this.mantenimientoMascota.newmanten(manten)
        .then(data=>{
          this.localNotifications.schedule({
            title: 'Se requiere la tarea '+this.manten_desc,
            trigger: { every: frecuency}
          });
          this.modalCtrl.dismiss({
            submitted: true
          });
        })
        // this.mantenService.submitManten(manten).subscribe(data=>{
        //   this.modalCtrl.dismiss({
        //     new: data.data
        //   })
        // });
      }
    }
  }

}
