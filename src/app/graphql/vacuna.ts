import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Vacuna {
    id: number,
    descripcion: string,
    createdAt: string,
    updatedAt: string
}
export interface Response {
    allVacuna: Vacuna[]
}
@Injectable({
    providedIn: "root"
})
export class VacunaGQL extends Query<Response> {
    document = gql `
        query Vacunas{
            allVacuna{
                id
                descripcion
            }
        }
    `;
}