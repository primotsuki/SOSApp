import { Component, OnInit } from '@angular/core';
import { TestNumerico, TestNumericoGQL } from '../../../graphql/testNumerico';
import { ModalController } from '@ionic/angular';
import { NumericoService } from '../../../offline/testNumerico';

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
    private modalCtrl: ModalController,
    private numericoLite: NumericoService 
  ) { }

  ngOnInit() {
    this.numericoGQL.watch()
    .valueChanges.subscribe(data=>{
      this.numericos = data.data.allTestNumerico;
      this.numericoLite.saveData(this.numericos);
    }, err=>{
      this.numericoLite.getAll()
      .then(data=>{
        this.numericos = data;
      })
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
