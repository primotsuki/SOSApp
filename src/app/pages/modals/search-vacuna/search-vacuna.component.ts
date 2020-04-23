import { Component, OnInit } from '@angular/core';
import { VacunaGQL, Vacuna } from '../../../graphql/vacuna';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-vacuna',
  templateUrl: './search-vacuna.component.html',
  styleUrls: ['./search-vacuna.component.scss'],
})
export class SearchVacunaComponent implements OnInit {

  vacunas: Vacuna[];
  textoBuscar = '';
  constructor(
    private vacunaService: VacunaGQL,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.vacunaService.watch()
    .valueChanges.subscribe(data=>{
      this.vacunas = data.data.allVacuna;
    });
  }
  buscarVacuna( event ){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }
  selectVacuna(elem: any) {
    this.modalCtrl.dismiss({
      id: elem.id,
      descripcion: elem.descripcion
    })
  }
}
