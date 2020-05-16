import { Component, OnInit } from '@angular/core';
import { SlideOpts } from '../slide';

@Component({
  selector: 'app-cuidados',
  templateUrl: './cuidados.component.html',
  styleUrls: ['./cuidados.component.scss'],
})
export class CuidadosComponent implements OnInit {

  slideOpts: any;
  constructor() { }
  ngOnInit() {
    this.slideOpts = SlideOpts;
  }
  
}
