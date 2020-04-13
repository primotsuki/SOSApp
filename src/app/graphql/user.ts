import { Injectable } from "@angular/core";
import {  Apollo } from "apollo-angular";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from "graphql-tag";

@Injectable({
    providedIn: "root"
})
export class userGQL {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    mutation = gql`
    mutation signup( $username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password){
            id,
           username,
           email
        }
       }
`

    constructor(private apollo: Apollo) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUser = this.currentUserSubject.asObservable();
    }

    public newUser(user: any) {
        return this.apollo.mutate({
            mutation: this.mutation,
            variables: user
        });
    }
}
