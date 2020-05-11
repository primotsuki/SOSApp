import { Component, OnInit } from '@angular/core';
import {TestGenModalComponent} from '../modals/test-gen-modal/test-gen-modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {GeneticoMascota,GeneticoMascotaGQL } from '../../graphql/GeneticoMascota';
import { geneticoMascotaService } from '../../offline/GeneticoMascota';

@Component({
  selector: 'app-test-genetico',
  templateUrl: './test-genetico.component.html',
  styleUrls: ['./test-genetico.component.scss'],
})
export class TestGeneticoComponent implements OnInit {

  geneticos: GeneticoMascota[];
  mascota_id: number;
  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private genMascotaGQL: GeneticoMascotaGQL,
    private geneticoLite: geneticoMascotaService
  ) { }
  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    this.geneticoLite.getAll(this.mascota_id)
    .then(data=>{
      this.geneticos = data;
    });
    // this.genMascotaGQL.watch({
    //   mascota_id: this.mascota_id
    // })
    // .valueChanges.subscribe(data=>{
    //    this.geneticos = data.data.testGenByMascota;
    //    console.log(this.geneticos);
    // })
  }
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: TestGenModalComponent,
      componentProps: {
        mascota_id: this.mascota_id
      }
    });
    modal.onWillDismiss().then(data=>{
      this.ngOnInit();
      // if(data.data == undefined)
      //   return;
      // this.geneticos.push({
      //   id: data.data.new.saveTestGenByMascota.id,
      //   fecha_test: data.data.new.saveTestGenByMascota.fecha_test,
      //   notas: data.data.new.saveTestGenByMascota.notas,
      //   resultado: data.data.new.saveTestGenByMascota.resultado,
      //   test: {
      //     id: data.data.test.id,
      //     descripcion: data.data.test.descripcion
      //   }
      // })
    });
    return await modal.present();
  }

}
