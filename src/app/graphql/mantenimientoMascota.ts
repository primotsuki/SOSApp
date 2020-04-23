import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';
import { userGQL } from './user';

export interface Mantenimiento {
    id: number,
    notas: String,
    fecha_mantenimiento: String,
    recordatorio: Boolean,
    realizado: Boolean,
    proximo: String,
    num_prog: number,
    intervalo_prog: String,
    programado: Boolean
}
export interface Response {
    MantenMascota: Mantenimiento[];
}
@Injectable({
    providedIn: "root"
})
export class MantenimientoMascota extends Query<Response> {
            document = gql`
                query getMantenimientos($mascota_id: ID!, $manten_id: ID!){
                    MantenMascota(mascota_id: $mascota_id, manten_id: $manten_id){
                        id
                        notas
                        fecha_mantenimiento
                        recordatorio
                        realizado
                        proximo
                        num_prog
                        intervalo_prog
                        programado
                    }
                }
            `;
}
@Injectable({
    providedIn: "root"
})
export class submitMantenimiento{
    mutation = gql`
        mutation submitMascota($mascota_id: ID!,$mantenimiento_id: ID!, $notas: String, $fecha_mantenimiento: String!, $recordatorio: Boolean!, $realizado: Boolean!, $proximo: String, $num_prog: Int, $intervalo_prog: String, $programado: Boolean!){
            saveMantenMascota(mascota_id: $mascota_id, mantenimiento_id: $mantenimiento_id, notas: $notas, fecha_mantenimiento: $fecha_mantenimiento, recordatorio: $recordatorio,realizado: $realizado, proximo: $proximo, num_prog: $num_prog, intervalo_prog: $intervalo_prog, programado: $programado){
                id
                notas
                fecha_mantenimiento
                recordatorio
                realizado
                proximo
                num_prog
                intervalo_prog
                programado
            }
        }
    `;
    constructor(private apollo: Apollo,
                private userQuery: userGQL)
                {}
    submitManten(mantenimiento:any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: mantenimiento
        });
    }
}