import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medios',
  templateUrl: './medios.component.html',
  styleUrls: ['./medios.component.scss'],
})
export class MediosComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
 
  constructor() { }

  ngOnInit() {
    let video  = document.getElementById("background");
  }
  finVideo(){
    console.log('termino el video')
  }
}
