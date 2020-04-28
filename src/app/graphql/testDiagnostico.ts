import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface testDiagnostico {
    id: number,
    descripcion: string,
    createdAt: string,
    updatedAt: string
}
export interface Response {
    allTestDiagnostico: testDiagnostico[]
}
@Injectable({
    providedIn: "root"
})
export class diagnosticoGQL extends Query<Response> {
    document = gql `
        query Diagnostico{
            allTestDiagnostico{
                id
                descripcion
            }
        }
    `;
}