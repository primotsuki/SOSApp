import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../offline/mascota';
import { Mascota } from '../../graphql/mascota';
import { ActivatedRoute } from '@angular/router';
import { CameraService } from '../../core/camera.service';
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
})
export class MascotasComponent implements OnInit {

  mascota_id: number
  mascota : Mascota = {
    photo_data: 'assets/images/pet-avatar.png',
    tipo:{
      descripcion: ''
    }
  };
  constructor(
    private route: ActivatedRoute,
    private mascotaLite: MascotaService,
    private cameraService: CameraService
  ) { }

  async ngOnInit() {
    await this.route.params.subscribe(params=>{
      this.mascota_id = params.id;
    });
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

}
