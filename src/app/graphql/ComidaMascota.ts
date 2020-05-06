import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface ComidaMascota {
    id: number,
    notas: string,
    fecha_comida: string,
    cantidad: number,
    medida: string,
    recordatorio: Boolean,
    hora_recordatorio: string,
    suministro: {
        id: number,
        descripcion: string,
    }
}
export interface Response {
    ComidaByMascota: ComidaMascota[];
}
@Injectable({
    providedIn: "root"
})
export class ComidaMascotaGQL extends Query<Response> {
    document = gql`
        query ComidasMascota($mascota_id: ID!){
            ComidaByMascota(mascota_id: $mascota_id){
                id
                notas
                fecha_comida
                cantidad
                medida
                recordatorio
                hora_recordatorio
                suministro{
                    id
                    descripcion
                }
            }
        }
    `;
}

@Injectable({
    providedIn: "root"
})
export class SubmitComidaMascota{
    mutation = gql`
        mutation SubmitComidaMascota($suministro_id: ID!, $mascota_id: ID!, $fecha_comida: String!,$recordatorio: Boolean!, $medida: String!, $cantidad: Int!, $hora_recordatorio: String!, $notas: String!){
            saveComidaMascota(suministro_id: $suministro_id, mascota_id: $mascota_id, fecha_comida: $fecha_comida,recordatorio: $recordatorio, medida: $medida,cantidad: $cantidad,hora_recordatorio: $hora_recordatorio, notas: $notas){
                id
                notas
                fecha_comida
                cantidad
                medida
                recordatorio
                hora_recordatorio
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitComida(diagnostico: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: diagnostico
        })
    }
}

@Injectable({
    providedIn: "root"
})
export class EditComidaMascota{
    mutation = gql`
        mutation EditComidaMascota($id: ID! $suministro_id: ID!, $fecha_comida: String!,$recordatorio: Boolean!, $medida: String!, $cantidad: Int!, $hora_recordatorio: String!, $notas: String!){
            EditComidaMascota(id: $id, suministro_id: $suministro_id, fecha_comida: $fecha_comida,recordatorio: $recordatorio, medida: $medida,cantidad: $cantidad,hora_recordatorio: $hora_recordatorio, notas: $notas){
                id
            }
        }
    `;
    constructor(private apollo: Apollo){}

    EditComida(diagnostico: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: diagnostico
        })
    }
}