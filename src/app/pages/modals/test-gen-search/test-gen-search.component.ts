import { Component, OnInit } from '@angular/core';
import { testGenetico, GeneticoGQL } from '../../../graphql/testGenetico';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-test-gen-search',
  templateUrl: './test-gen-search.component.html',
  styleUrls: ['./test-gen-search.component.scss'],
})
export class TestGenSearchComponent implements OnInit {

  geneticos: testGenetico[];
  textoBuscar = '';
  constructor(
    private genetico: GeneticoGQL,
    private modalCtrl: ModalController 
  ) { }

  ngOnInit() {
    this.genetico.watch()
    .valueChanges.subscribe(data=>{
      this.geneticos = data.data.allTestGenetico;
    });
  }
  buscartest( event ){
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
