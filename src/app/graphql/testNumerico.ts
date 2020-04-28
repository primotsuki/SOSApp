import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface TestNumerico {
    id: number,
    descripcion: string,
    createdAt: string,
    updatedAt: string
}
export interface Response {
    allTestNumerico: TestNumerico[]
}
@Injectable({
    providedIn: "root"
})
export class TestNumericoGQL extends Query<Response> {
    document = gql `
        query Medicamentos{
            allTestNumerico{
                id
                descripcion
            }
        }
    `;
}