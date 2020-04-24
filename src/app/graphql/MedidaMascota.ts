import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Medidas {
    id: number,
    notas: string,
    fecha_medicion: string,
    valor: number,
    unidad: {
        id: number,
        unidad: string
    },
    tipo_medicion: {
        id: number,
        descripcion: string
    }
}

export interface Response {
    MedicionesByMascota: Medidas[];
}
@Injectable({
    providedIn: "root"
})
export class MedicionMascota extends Query<Response> {
    document = gql`
        query getMedidas($mascota_id: ID!, $medicion_id: ID!){
            MedicionesByMascota(mascota_id: $mascota_id, medicion_id: $medicion_id){
                id
                notas
                valor
                fecha_medicion
                tipo_medicion{
                    id
                    descripcion
                }
                unidad{
                    id
                    unidad
                }
            }
        }
    `;
}

@Injectable({
    providedIn: "root"
})
export class SubmitMedidaMascota {
    mutation = gql`
    mutation SubmitVacunaMascota($medicion_id: ID!, $mascota_id: ID!,$valor: Int!, $unidad_id: ID!, $fecha_medicion: String!, $notas: String!){
        saveMedicionMascota(medicion_id: $medicion_id,mascota_id: $mascota_id,valor: $valor, unidad_id: $unidad_id, fecha_medicion: $fecha_medicion, notas: $notas){
            id
            valor
            notas
            fecha_medicion
        }
    }
`;
constructor(private apollo: Apollo){}

submitMedicion(medida: any) {
    return this.apollo.mutate({
        mutation: this.mutation,
        variables: medida
    })
}
}