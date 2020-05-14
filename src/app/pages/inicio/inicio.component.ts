import { Component, OnInit } from '@angular/core';
import { MascotaGQL,Mascota } from '../../graphql/mascota';
import { userGQL} from '../../graphql/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaModalComponent } from '../modals/mascota-modal/mascota-modal.component';
import { ModalController } from '@ionic/angular';
import { MascotaService } from '../../offline/mascota';
import { CameraService } from '../../core/camera.service';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

    mascotas: Mascota[] =[];
    confirmMessage: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaQuery: MascotaGQL,
    private userQuery: userGQL,
    private modalCtrl: ModalController,
    private mascotaSQLite: MascotaService,
    private cameraService: CameraService,
  ) { }
  ngOnInit() {
    this.mascotaSQLite.getAll()
    .then(data=>{
      console.log(data);
      this.mascotas = data;
      this.loadPhotos();
    });
    // this.mascotaQuery.watch({
    //   user_id: this.userQuery.currentUserValue.login.user_id
    // })
    // .valueChanges.subscribe(data=>{
    //   this.mascotas = data.data.MascotaByUser;
    // });
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MascotaModalComponent
    });
    modal.onWillDismiss().then(data=>{
        this.ngOnInit();
    });
    return await modal.present();
  }
  loadPhotos() {
    this.mascotas.forEach(elem=>{
      if(elem.photo_uri !=''){
        this.cameraService.loadSavedPhoto(elem.photo_uri)
      .then(data=>{
        elem.photo_data = `data:image/jpeg;base64,${data.data}`;
      })
      } else {
        elem.photo_uri = 'assets/images/pet-avatar.png'
      }
    })
  }
}
