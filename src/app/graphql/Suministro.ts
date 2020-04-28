import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Suministro {
    id: number,
    descripcion: string,
    createdAt: string,
    updatedAt: string
}
export interface Response {
    allSuministro: Suministro[]
}
@Injectable({
    providedIn: "root"
})
export class SuministroGQL extends Query<Response> {
    document = gql `
        query Suministros{
            allSuministro{
                id
                descripcion
            }
        }
    `;
}