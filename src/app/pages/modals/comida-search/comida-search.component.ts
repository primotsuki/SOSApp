import { Component, OnInit } from '@angular/core';
import { Suministro, SuministroGQL } from '../../../graphql/Suministro';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comida-search',
  templateUrl: './comida-search.component.html',
  styleUrls: ['./comida-search.component.scss'],
})
export class ComidaSearchComponent implements OnInit {

  suministros: Suministro[];
  textoBuscar = '';
  constructor(
    private suministro: SuministroGQL,
    private modalCtrl: ModalController 
  ) { }

  ngOnInit() {
    this.suministro.watch()
    .valueChanges.subscribe(data=>{
      this.suministros = data.data.allSuministro;
    });
  }
  buscarSuministro( event ){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }
  selectItem(elem: any) {
    this.modalCtrl.dismiss({
      id: elem.id,
      descripcion: elem.descripcion
    })
  }

}
