import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Manten {
    id: number,
    descripcion: string,
    createdAt: string,
    updatedAt: string
}
export interface Response {
    MantenimientoById: Manten[]
}
@Injectable({
    providedIn: "root"
})
export class MantenGQL extends Query<Response> {
    document = gql `
        query MAntenByUser($id: ID!){
            MantenimientoById(id: $id){
                id
                descripcion
            }
        }
    `;
}