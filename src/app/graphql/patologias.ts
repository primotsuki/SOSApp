import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Patologia {
    id: number,
    nombre: string,
    notas: string,
    fecha: string,
    gravedad: string,
    acciones: string,
}
export interface Response {
    PatologiaByMascota: Patologia[];
}
@Injectable({
    providedIn: "root"
})
export class PatologiasGQL extends Query<Response> {
    document = gql`
        query getPatologiaByMascota($mascota_id: ID!){
            PatologiaByMascota(mascota_id: $mascota_id){
                id
                nombre
                notas
                fecha
                gravedad
                acciones
            }
        }
    `;
}

@Injectable({
    providedIn: "root"
})
export class SubmitPatologias{
    mutation = gql`
        mutation submitPatologia($mascota_id: ID!,$nombre: String!, $fecha: String!, $notas: String!, $gravedad: String!, $acciones: String!){
            savePatologia(mascota_id: $mascota_id,nombre: $nombre, fecha: $fecha, notas: $notas,gravedad: $gravedad, acciones: $acciones){
                id
                nombre
                notas
                fecha
                gravedad
                acciones
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitPatologia(patologia: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: patologia
        })
    }
}