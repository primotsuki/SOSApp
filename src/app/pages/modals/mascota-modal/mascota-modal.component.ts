import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMascota, TipoMascotaGQL } from '../../../graphql/tipomascota';
import { submitMascotaService } from '../../../graphql/mascota';
import { TipoMascotaService } from '../../../offline/TipoMascota';
import { MascotaService } from '../../../offline/mascota';
import { CameraService, Photo } from '../../../core/camera.service';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;
@Component({
  selector: 'app-mascota-modal',
  templateUrl: './mascota-modal.component.html',
  styleUrls: ['./mascota-modal.component.scss'],
})
export class MascotaModalComponent implements OnInit {

  mascotaForm: FormGroup;
  submitted =false;
  tipos: TipoMascota[];
  photo: CameraPhoto = {
    format: '',
    path: '',
    webPath: 'assets/images/pet-avatar.png'
  }
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private tipoQuery: TipoMascotaGQL,
    private mascotaQuery: submitMascotaService,
    private tipoLite: TipoMascotaService,
    private mascotaLite: MascotaService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      caracteristicas: [''],
      fecha_exacta:['t'],
      fecha_nacimiento: ['2019-10-01T15:43:40.394Z'],
      color: ['', Validators.required],
      mes_aprox: [''],
      year_aprox:[''],
      tipo:[null, Validators.required]
    });
    this.getTipoMascota();
  }

  get f(){ return this.mascotaForm.controls;}
  async close(){
    await this.modalCtrl.dismiss({
      completed: false
    });
  }
  getTipoMascota(){
    this.tipoQuery.watch()
    .valueChanges.subscribe(data=>{
      this.tipos = data.data.AllTipo;
    }, err=>{
      this.tipoLite.getAll()
      .then(data=>{
        this.tipos = data;
      })
    });
  }
  async OnSubmit(){
    this.submitted = true;
    if(this.mascotaForm.invalid){
      return;
    } else {
      let photo_uri = '';
      if(this.photo.path != ''){
        await this.cameraService.savePicture(this.photo)
        .then(data=>{
          photo_uri = data.filepath
        })
      }
      const mascota = {
        nombre: this.f.nombre.value,
        fecha_nacimiento: this.f.fecha_nacimiento.value,
        caracteristicas: this.f.caracteristicas.value,
        color: this.f.color.value,
        mes_aprox: this.f.mes_aprox.value,
        year_aprox: this.f.year_aprox.value,
        tipo_id: this.f.tipo.value,
        photo_uri: photo_uri,
        submitted: false
      };
      this.mascotaLite.newMascota(mascota)
      .then(data=>{
        console.log(data);
        this.modalCtrl.dismiss({
          completed: true
        })
      });

    }
  }
  async AddPhoto(){
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 40
    })
    this.photo = capturedPhoto;
    // this.cameraService.savePicture(capturedPhoto)
    // .then(data=>{
    //   console.log('este es el resultado pendejo!');
    //   console.log(data);
    //   this.cameraService.loadSavedPhoto(data.filepath)
    //   .then(data=>{
    //     console.log('este es el resultado de la lectura de datos');
    //     console.log(data);
    //   })
    // })
  }
}
