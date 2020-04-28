import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface GeneticoMascota {
    id: number,
    notas: string,
    fecha_test: string,
    resultado: string,
    test: {
        id: number,
        descripcion: string,
    }
}
export interface Response {
    testGenByMascota: GeneticoMascota[];
}
@Injectable({
    providedIn: "root"
})
export class GeneticoMascotaGQL extends Query<Response> {
    document = gql`
        query GeneticoMascota($mascota_id: ID!){
            testGenByMascota(mascota_id: $mascota_id){
                id
                notas
                fecha_test
                resultado
                test{
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
export class SubmitGeneticoMascota{
    mutation = gql`
        mutation SubmitGeneticoMascota($test_id: ID!, $mascota_id: ID!, $fecha_test: String!,$resultado: String! $notas: String!){
            saveTestGenByMascota(test_id: $test_id, mascota_id: $mascota_id, fecha_test: $fecha_test,resultado: $resultado, notas: $notas){
                id
                notas
                fecha_test
                resultado
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitGenetico(genetico: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: genetico
        })
    }
}