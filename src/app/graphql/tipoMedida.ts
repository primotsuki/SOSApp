import {Injectable} from '@angular/core';
import {Apollo, Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface TipoMedicion {
    id: number,
    descripcion: number,
    unidades: any[]
}
export interface UnidadMedida {
    id: number,
    unidad: String
}
export interface Response {
    tipoMediciones: TipoMedicion[];
}
@Injectable({
    providedIn: "root"
})
export class TipoMedidaGQL extends Query<Response> {
            document = gql`
                query gettipoMediciones($id: ID!){
                    tipoMediciones(id: $id){
                        id
                        descripcion
                        unidades{
                            id
                            unidad
                        }
                    }
                }
            `;
}