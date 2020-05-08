import { Component, OnInit} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMascota, TipoMascotaGQL } from '../../../graphql/tipomascota';
import { submitMascotaService } from '../../../graphql/mascota';
import { TipoMascotaService } from '../../../offline/TipoMascota';
import { MascotaService } from '../../../offline/mascota';
@Component({
  selector: 'app-mascota-modal',
  templateUrl: './mascota-modal.component.html',
  styleUrls: ['./mascota-modal.component.scss'],
})
export class MascotaModalComponent implements OnInit {

  mascotaForm: FormGroup;
  submitted =false;
  tipos: TipoMascota[];

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private tipoQuery: TipoMascotaGQL,
    private mascotaQuery: submitMascotaService,
    private tipoLite: TipoMascotaService,
    private mascotaLite: MascotaService
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
  OnSubmit(){
    this.submitted = true;
    if(this.mascotaForm.invalid){
      return;
    } else {
      const mascota = {
        nombre: this.f.nombre.value,
        fecha_nacimiento: this.f.fecha_nacimiento.value,
        caracteristicas: this.f.caracteristicas.value,
        color: this.f.color.value,
        mes_aprox: this.f.mes_aprox.value,
        year_aprox: this.f.year_aprox.value,
        tipo_id: this.f.tipo.value,
        submitted: false
      };
      this.mascotaLite.newMascota(mascota)
      .then(data=>{
        console.log(data);
        this.modalCtrl.dismiss({
          completed: true
        })
      });
      // this.mascotaQuery.submitMascota(mascota).subscribe(data=>{
      //   this.modalCtrl.dismiss({
      //     completed:true
      //   })
      // })
    }
  }
}
