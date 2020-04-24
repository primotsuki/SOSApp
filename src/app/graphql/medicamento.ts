import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Medicamento {
    id: number,
    descripcion: string,
    createdAt: string,
    updatedAt: string
}
export interface Response {
    allMedicamento: Medicamento[]
}
@Injectable({
    providedIn: "root"
})
export class medicamentoGQL extends Query<Response> {
    document = gql `
        query Medicamentos{
            allMedicamento{
                id
                descripcion
            }
        }
    `;
}