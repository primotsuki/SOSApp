import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { userGQL} from './user';

@Injectable({
    providedIn: "root"
})
export class MascotaGQL {
    constructor(private apollo: Apollo,
                private userQuery: userGQL) {

    }

    public getMascotas(){
        const query = gql`
            query getMascotaById($user_id: ID!){
                MascotaByUser(user_id: $user_id){
                    nombre
                    tipo{
                        descripcion
                    }
                }
            }
        `;
        console.log(this.userQuery.currentUserValue);
        return this.apollo.watchQuery({
            query: query,
            variables: {
                user_id: this.userQuery.currentUserValue.login.user_id
            }
        })
    }
}