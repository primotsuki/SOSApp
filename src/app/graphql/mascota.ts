import { Injectable } from '@angular/core';
import { Apollo, Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { userGQL } from './user';

export interface Mascota {
    id?: number,
    nombre?: string,
    caracteristicas?: string,
    fecha_nacimiento?: string,
    color?: string,
    mes_aprox?: number,
    year_aprox?: number,
    user_id?: number,
    photo_uri?: string,
    photo_data?: string,
    tipo?: {
        id?: number,
        descripcion?: string
    }
}
export interface Response {
    MascotaByUser: Mascota[];
}
@Injectable({
    providedIn: "root"
})
export class MascotaGQL extends Query<Response> {
        document = gql`
            query getMascotaById($user_id: ID!){
                MascotaByUser(user_id: $user_id){
                    id
                    nombre
                    caracteristicas
                    tipo{
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
export class submitMascotaService{
    mutation = gql`
        mutation submitMascota($user_id: ID!, $nombre: String!,$caracteristicas: String! $fecha_nacimiento: String, $color: String, $tipo_id: ID!){
            saveMascota(user_id: $user_id,nombre: $nombre, caracteristicas: $caracteristicas, fecha_nacimiento: $fecha_nacimiento, color: $color,tipo_id: $tipo_id){
                id
                nombre
            }
        }
    `;

    constructor(private apollo: Apollo,
                private userQuery: userGQL){}

    submitMascota(mascota: any){
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: {
                ...mascota,
                user_id: this.userQuery.currentUserValue.login.user_id
            }
        })
    }
}