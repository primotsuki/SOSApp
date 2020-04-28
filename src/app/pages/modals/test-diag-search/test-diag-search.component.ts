import { Component, OnInit } from '@angular/core';
import { testDiagnostico, diagnosticoGQL } from '../../../graphql/testDiagnostico';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-test-diag-search',
  templateUrl: './test-diag-search.component.html',
  styleUrls: ['./test-diag-search.component.scss'],
})
export class TestDiagSearchComponent implements OnInit {

  diagnosticos: testDiagnostico[];
  textoBuscar = '';
  constructor(
    private diagnosGQL: diagnosticoGQL,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.diagnosGQL.watch()
    .valueChanges.subscribe(data=>{
      this.diagnosticos = data.data.allTestDiagnostico;
    });
  }
  async close() {
    await this.modalCtrl.dismiss();
  }
  buscarDiagnostico( event ){
    const texto = event.target.value;
    this.textoBuscar = texto;
  }
  selectDiagnostico(elem: any) {
    this.modalCtrl.dismiss({
      id: elem.id,
      descripcion: elem.descripcion
    })
  }

}
