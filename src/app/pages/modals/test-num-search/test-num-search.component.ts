import { Component, OnInit } from '@angular/core';
import { TestNumerico, TestNumericoGQL } from '../../../graphql/testNumerico';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-test-num-search',
  templateUrl: './test-num-search.component.html',
  styleUrls: ['./test-num-search.component.scss'],
})
export class TestNumSearchComponent implements OnInit {

  numericos: TestNumerico[];
  textoBuscar = '';
  constructor(
    private numericoGQL: TestNumericoGQL,
    private modalCtrl: ModalController 
  ) { }

  ngOnInit() {
    this.numericoGQL.watch()
    .valueChanges.subscribe(data=>{
      this.numericos = data.data.allTestNumerico;
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
