import { Component, OnInit } from '@angular/core';
import { CubeOpts } from '../slide';
@Component({
  selector: 'app-obligaciones',
  templateUrl: './obligaciones.component.html',
  styleUrls: ['./obligaciones.component.scss'],
})
export class ObligacionesComponent implements OnInit {

  slideOpts: any;
  constructor() { }

  ngOnInit() {
    this.slideOpts = CubeOpts;
  }

}
