import { Component, OnInit } from '@angular/core';
import { MascotaGQL,Mascota } from '../../graphql/mascota';
import { userGQL} from '../../graphql/user';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaModalComponent } from '../modals/mascota-modal/mascota-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

    mascotas: Mascota[];
    confirmMessage: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaQuery: MascotaGQL,
    private userQuery: userGQL,
    private modalCtrl: ModalController
  ) { }
  ngOnInit() {
    this.mascotaQuery.watch({
      user_id: this.userQuery.currentUserValue.user_id
    })
    .valueChanges.subscribe(data=>{
      console.log(data);
      this.mascotas = data.data.MascotaByUser;
    });
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MascotaModalComponent
    });
    modal.onWillDismiss().then(data=>{
      console.log(data.data.completed);
      if(data.data.completed)
        this.ngOnInit();
    });
    return await modal.present();
  }
  getConfirmation(message: boolean) {
    this.confirmMessage = message;
    console.log('se agrego correctamente la mascota');
  }
}
