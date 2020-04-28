import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface testGenetico {
    id: number,
    descripcion: string,
    createdAt: string,
    updatedAt: string
}
export interface Response {
    allTestGenetico: testGenetico[]
}
@Injectable({
    providedIn: "root"
})
export class GeneticoGQL extends Query<Response> {
    document = gql `
        query Gentico{
            allTestGenetico{
                id
                descripcion
            }
        }
    `;
}