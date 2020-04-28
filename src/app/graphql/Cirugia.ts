import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Cirugia {
    id: number,
    nombre: string,
    notas: string,
    fecha: string,
    tipo_cirugia: string,
    precio: number,
    observaciones: string
}
export interface Response {
    CirugiaByMascota: Cirugia[];
}
@Injectable({
    providedIn: "root"
})
export class CirugiasGQL extends Query<Response> {
    document = gql`
        query getCirugiaByMascota($mascota_id: ID!){
            CirugiaByMascota(mascota_id: $mascota_id){
                id
                nombre
                tipo_cirugia
                precio
                fecha
                observaciones
            }
        }
    `;
}

@Injectable({
    providedIn: "root"
})
export class SubmitCirugias{
    mutation = gql`
        mutation submitCirugia($mascota_id: ID!,$nombre: String!, $fecha: String!,$precio: Int!, $observaciones: String!, $notas: String!, $tipo_cirugia: String!){
            saveCirugia(mascota_id: $mascota_id,nombre: $nombre, fecha: $fecha,precio: $precio, observaciones: $observaciones, notas: $notas, tipo_cirugia: $tipo_cirugia){
                id
                nombre
                tipo_cirugia
                precio
                fecha
                observaciones
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitCirugia(patologia: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: patologia
        })
    }
}