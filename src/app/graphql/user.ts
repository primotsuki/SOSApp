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

    constructor(private apollo: Apollo) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUser = this.currentUserSubject.asObservable();
    }

    public newUser(user: any) {
       const mutation = gql`
        mutation signup( $username: String!, $email: String!, $password: String!) {
            signup(username: $username, email: $email, password: $password){
                id,
               username,
               email
            }
           }
    `;
        return this.apollo.mutate({
            mutation: mutation,
            variables: user
        });
    }
    public login(user: any) {
        const mutation = gql`
        mutation login( $email: String!, $password: String!) {
            login(email: $email, password: $password) {
                user_id
                token
            }
        }        
        `;
        return this.apollo.mutate({
            mutation: mutation,
            variables: user
        }).pipe(map(user => {
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUserSubject.next(user.data);
            return user;
        }));
    }
    public get currentUserValue(){
        return this.currentUserSubject.value;
    }
}
