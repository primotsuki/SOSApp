import { Component, OnInit } from '@angular/core';
import { VacunaGQL, Vacuna } from '../../../graphql/vacuna';
import { ModalController } from '@ionic/angular';
import { VacunaService } from '../../../offline/vacuna';

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
    private modalCtrl: ModalController,
    private vacunaLite: VacunaService
  ) { }

  ngOnInit() {
    this.vacunaService.watch()
    .valueChanges.subscribe(data=>{
      this.vacunas = data.data.allVacuna;
      this.vacunaLite.saveData(this.vacunas);
    }, err=>{
      this.vacunaLite.getAll()
      .then(data=>{
        this.vacunas = data;
      })
    });
  }
  buscarVacuna( event ){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }
  async close() {
    await this.modalCtrl.dismiss();
  }
  selectVacuna(elem: any) {
    this.modalCtrl.dismiss({
      id: elem.id,
      descripcion: elem.descripcion
    })
  }
}
