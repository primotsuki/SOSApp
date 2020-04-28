import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface NumericoMascota {
    id: number,
    valor: number,
    notas: string,
    fecha_test: string,
    margen_bajo: number,
    margen_alto: number,
    test: {
        id: number,
        descripcion: string,
    },
    unidad: {
        id:number,
        unidad: string
    }
}
export interface Response {
    TestNumByMascota: NumericoMascota[];
}
@Injectable({
    providedIn: "root"
})
export class NumericoMascotaGQL extends Query<Response> {
    document = gql`
        query NumericoMascota($mascota_id: ID!){
            TestNumByMascota(mascota_id: $mascota_id){
                id
                valor
                notas
                fecha_test
                margen_bajo
                margen_alto
                test{
                    id
                    descripcion
                },
                unidad{
                    id
                    unidad
                }
            }
        }
    `;
}

@Injectable({
    providedIn: "root"
})
export class SubmitNumericoMascota{
    mutation = gql`
        mutation SubmitNumerico($test_id: ID!, $mascota_id: ID!,$valor: Int!, $unidad_id: ID!, $fecha_test: String!,$margen_bajo: Int!, $margen_alto: Int!, $notas: String!){
            saveTestNumMascota(test_id: $test_id, mascota_id: $mascota_id,valor: $valor, unidad_id: $unidad_id ,fecha_test: $fecha_test,margen_bajo: $margen_bajo, margen_alto: $margen_alto, notas: $notas){
                id
                valor
                notas
                fecha_test
                margen_bajo
                margen_alto
            }
        }
    `;
    constructor(private apollo: Apollo){}

    submitNumerico(numerico: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: numerico
        })
    }
}