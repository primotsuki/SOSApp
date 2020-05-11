import { Component, OnInit } from '@angular/core';
import {HigieneModalComponent} from '../modals/higiene-modal/higiene-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoMascota, Mantenimiento } from '../../graphql/mantenimientoMascota';
import { MantenGQL,Manten } from '../../graphql/mantenimiento';
import { MantenimientoService } from '../../offline/grupo_mantenimiento';
import { MantenimientoMascotaService } from '../../offline/mantenimiento';
import * as moment from 'moment';

@Component({
  selector: 'app-higiene-fill',
  templateUrl: './higiene-fill.component.html',
  styleUrls: ['./higiene-fill.component.scss'],
})
export class HigieneFillComponent implements OnInit {

  mascota_id: number;
  manten_id: number;
  mantenimientos: Mantenimiento[];
  manten: any = {
    descripcion : ''
  };
  regVigente: any ={
    num_prog: null,
    intervalo_prog: null,
    programado: false,
    fecha_mantenimiento: null,
    proximo: null
  };
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private mantenGQL: MantenimientoMascota,
    private mantenQuery: MantenGQL,
    private MantenLite: MantenimientoService,
    private MantenMascotaLite: MantenimientoMascotaService
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
      this.manten_id = params.higiene_id;
    });
    this.MantenMascotaLite.getAll(this.mascota_id, this.manten_id)
    .then(data=>{
      this.mantenimientos = data;
      if(this.mantenimientos.length>0)
        this.findVigente();
    })
    // await this.mantenGQL.watch({
    //   mascota_id: this.mascota_id,
    //   manten_id: this.manten_id
    // })
    // .valueChanges.subscribe(data=>{
    //   this.mantenimientos = data.data.MantenMascota;
    //   if(this.mantenimientos.length>0) 
    //     this.findVigente();
    // });
    this.MantenLite.getMantenimiento(this.manten_id)
    .then(data=>{
      this.manten = data;
    })

    // await this.mantenQuery.watch({
    //   id: this.manten_id
    // }).valueChanges.subscribe(data=>{
    //   this.manten = data.data.MantenimientoById;
    // });
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: HigieneModalComponent,
      componentProps: {
        edit: false,
        mascota_id: this.mascota_id,
        manten_id: this.manten_id,
        manten_desc: this.manten.descripcion
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
    });
    return await modal.present();
  }
  async findVigente (){
    const index = await this.mantenimientos.findIndex(elem=>{
      return !elem.realizado;
    })
    const rem = this.mantenimientos.splice(index,1)[0];
    this.regVigente = rem;
  }
  async editItem(){
    const modal = await this.modalCtrl.create({
      component: HigieneModalComponent,
      componentProps: {
        edit: true,
        manten: this.regVigente,
        mascota_id: this.mascota_id,
        manten_id: this.manten_id,
        manten_desc: this.manten.descripcion
      }
    })
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
    });
    return await modal.present();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
