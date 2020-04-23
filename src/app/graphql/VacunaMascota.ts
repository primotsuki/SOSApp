import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface VacunaMascota {
    id: number,
    notas: string,
    fecha_vacuna: string,
    recordatorio: Boolean,
    realizado: Boolean,
    vacuna: {
        id: number,
        descripcion: string,
    }
}
export interface Response {
    vacunaByMascota: VacunaMascota[];
}
@Injectable({
    providedIn: "root"
})
export class VacunasMascota extends Query<Response> {
    document = gql`
        query getVacunaMascota($mascota_id: ID!){
            vacunaByMascota(mascota_id: $mascota_id){
                id
                notas
                fecha_vacuna
                recordatorio
                realizado
                vacuna{
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
export class SubmitVacunaMascota{
    mutation = gql`
        mutation SubmitVacunaMascota($mascota_id: ID!, $vacuna_id: ID!, $fecha_vacuna: String!, $recordatorio: Boolean!, $realizado: Boolean!, $notas: String!){
            saveVacunaMascota(mascota_id: $mascota_id, vacuna_id: $vacuna_id, fecha_vacuna: $fecha_vacuna, recordatorio: $recordatorio, realizado: $realizado, notas: $notas){
                id
                notas
                fecha_vacuna
                recordatorio
                realizado
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitVacuna(vacuna: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: vacuna
        })
    }
}