import {Injectable} from '@angular/core';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface TipoMascota {
    id: number,
    descripcion: string
}

export interface Response {
    AllTipo : TipoMascota[];
}

@Injectable({
    providedIn: "root"
})
export class TipoMascotaGQL extends Query<Response> {
    document = gql`
        query getAllTipo {
            AllTipo{
                id
                descripcion
            }
        }
    `
}

export interface Response {
    saveMascota: TipoMascota;
}