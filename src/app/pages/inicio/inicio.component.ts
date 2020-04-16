import { Component, OnInit } from '@angular/core';
import { MascotaGQL } from '../../graphql/mascota';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

    mascotas:any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaQuery: MascotaGQL
  ) { }

  ngOnInit() {
    this.mascotaQuery.getMascotas()
    .valueChanges.subscribe(data =>{
      console.log(data);
    }, error =>{
      console.log(error)
    });
  }

}
