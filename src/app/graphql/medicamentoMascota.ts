import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface MedicamentoMascota {
    id: number,
    notas: string,
    fecha_medicamento: string,
    recordatorio: Boolean,
    realizado: Boolean,
    medicamento: {
        id: number,
        descripcion: string,
    }
}
export interface Response {
    medicamentoByMascota: MedicamentoMascota[];
}
@Injectable({
    providedIn: "root"
})
export class MedicamentosMascota extends Query<Response> {
    document = gql`
        query MedicamentoMascota($mascota_id: ID!){
            medicamentoByMascota(mascota_id: $mascota_id){
                id
                notas
                fecha_medicamento
                recordatorio
                realizado
                medicamento{
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
export class SubmitMedicamentoMascota{
    mutation = gql`
        mutation SubmitMascota($mascota_id: ID!, $medicamento_id: ID!, $fecha_medicamento: String!, $recordatorio: Boolean!, $realizado: Boolean!, $notas: String!){
            saveMedicamentoMascota(mascota_id: $mascota_id, medicamento_id: $medicamento_id, fecha_medicamento: $fecha_medicamento, recordatorio: $recordatorio, realizado: $realizado, notas: $notas){
                id
                notas
                fecha_medicamento
                recordatorio
                realizado
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitmedicamento(medicamento: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: medicamento
        })
    }
}
@Injectable({
    providedIn: "root"
})
export class EditMedicamentoMascota{
    mutation = gql`
        mutation EdittMascota($id: ID!, $medicamento_id: ID!, $fecha_medicamento: String!, $recordatorio: Boolean!, $realizado: Boolean!, $notas: String!){
            EditMedicamentoMascota(id: $id, medicamento_id: $medicamento_id, fecha_medicamento: $fecha_medicamento, recordatorio: $recordatorio, realizado: $realizado, notas: $notas){
                id
            }
        }
    `;
    constructor(private apollo: Apollo){}

    EditMedicamento(medicamento: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: medicamento
        })
    }
}