import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../offline/mascota';
import { Mascota } from '../../graphql/mascota';
import { ActivatedRoute } from '@angular/router';
import { CameraService } from '../../core/camera.service';
import { MascotaModalComponent } from '../modals/mascota-modal/mascota-modal.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
})
export class MascotasComponent implements OnInit {

  mascota_id: number;
  mascota : Mascota = {
    photo_data: 'assets/images/pet-avatar.png',
    tipo:{
      descripcion: ''
    }
  };
  constructor(
    private route: ActivatedRoute,
    private mascotaLite: MascotaService,
    private cameraService: CameraService,
    private modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
    console.log('la id que llega es ', this.mascota_id);
    this.mascota = await this.mascotaLite.getById(this.mascota_id);
    if(this.mascota.photo_uri != ''){
      this.cameraService.loadSavedPhoto(this.mascota.photo_uri)
      .then(data=>{
        this.mascota.photo_data = `data:image/jpeg;base64,${data.data}`;
    })
    } else {
      this.mascota.photo_data = 'assets/images/pet-avatar.png';
    }
  }
  async editMascota(){
    console.log(this.mascota);
    const modal = await this.modalCtrl.create({
      component: MascotaModalComponent,
      componentProps: {
        edit: true,
        mascota: this.mascota
      }
    });
    modal.onWillDismiss().then(data=>{
        this.ngOnInit();
    });
    return await modal.present();
  }
}
