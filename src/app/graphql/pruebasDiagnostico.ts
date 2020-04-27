import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Prueba {
    id: number,
    notas: string,
    fecha_prueba: string,
    descripcion: string
}
export interface Response {
    PruebaByMascota: Prueba[];
}
@Injectable({
    providedIn: "root"
})
export class PruebasGQL extends Query<Response> {
    document = gql`
        query getPruebaByMascota($mascota_id: ID!){
            PruebaByMascota(mascota_id: $mascota_id){
                id
                notas
                fecha_prueba
                descripcion
            }
        }
    `;
}

@Injectable({
    providedIn: "root"
})
export class SubmitPruebas{
    mutation = gql`
        mutation submitPrueba($mascota_id: ID!, $fecha_prueba: String!, $notas: String!, $descripcion: String!){
            savePrueba(mascota_id: $mascota_id,fecha_prueba: $fecha_prueba, notas: $notas,descripcion: $descripcion){
                id
                notas
                fecha_prueba
                descripcion
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitPrueba(prueba: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: prueba
        })
    }
}