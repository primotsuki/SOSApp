import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface DiagnosticoMascota {
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
    testDiagByMascota: DiagnosticoMascota[];
}
@Injectable({
    providedIn: "root"
})
export class DiagnosticoMascotaGQL extends Query<Response> {
    document = gql`
        query DiagnosticoMascota($mascota_id: ID!){
            testDiagByMascota(mascota_id: $mascota_id){
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
export class SubmitDiagnosticoMascota{
    mutation = gql`
        mutation SubmitMascota($test_id: ID!, $mascota_id: ID!, $fecha_test: String!,$resultado: String! $notas: String!){
            saveTestDiagByMascota(test_id: $test_id, mascota_id: $mascota_id, fecha_test: $fecha_test,resultado: $resultado, notas: $notas){
                id
                notas
                fecha_test
                resultado
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitDiagnostico(diagnostico: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: diagnostico
        })
    }
}