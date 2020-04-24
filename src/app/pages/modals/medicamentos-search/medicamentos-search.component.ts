import { Component, OnInit } from '@angular/core';
import { medicamentoGQL, Medicamento } from '../../../graphql/medicamento';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-medicamentos-search',
  templateUrl: './medicamentos-search.component.html',
  styleUrls: ['./medicamentos-search.component.scss'],
})
export class MedicamentosSearchComponent implements OnInit {

  medicamentos: Medicamento[];
  textoBuscar = '';
  constructor(
    private MedicamentoService: medicamentoGQL,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.MedicamentoService.watch()
    .valueChanges.subscribe(data=>{
      this.medicamentos = data.data.allMedicamento;
      console.log(this.medicamentos);
    });
  }
  buscarMedicamento( event ){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }
  selectMedicamento(elem: any) {
    this.modalCtrl.dismiss({
      id: elem.id,
      descripcion: elem.descripcion
    })
  }

}
