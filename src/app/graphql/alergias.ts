import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Alergia {
    id: number,
    nombre: string
    notas: string,
    fecha_diagnostico: string,
    gravedad: string,
    categoria: string,
}
export interface Response {
    AlergiaByMascota: Alergia[];
}
@Injectable({
    providedIn: "root"
})
export class AlergiasGQL extends Query<Response> {
    document = gql`
        query getAlergiaByMascota($mascota_id: ID!){
            AlergiaByMascota(mascota_id: $mascota_id){
                id
                nombre
                notas
                fecha_diagnostico
                gravedad
                categoria
            }
        }
    `;
}

@Injectable({
    providedIn: "root"
})
export class SubmitAlergias{
    mutation = gql`
        mutation submitAlergia($mascota_id: ID!,$nombre: String!, $fecha_diagnostico: String!, $notas: String!, $gravedad: String!, $categoria: String!){
            saveAlergia(mascota_id: $mascota_id,nombre: $nombre, fecha_diagnostico: $fecha_diagnostico, notas: $notas,gravedad: $gravedad, categoria: $categoria){
                id
                nombre
                notas
                fecha_diagnostico
                gravedad
                categoria
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitAlergia(alergia: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: alergia
        })
    }
}