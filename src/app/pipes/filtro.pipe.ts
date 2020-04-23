import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';

@Pipe({
    name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
transform(vacunas: any[], texto: string) {
    if( texto.length === 0) {return vacunas;}

    texto = texto.toLocaleLowerCase();

    return vacunas.filter( vacuna =>{
        return vacuna.descripcion.toLocaleLowerCase().includes(texto);
    });
}
}