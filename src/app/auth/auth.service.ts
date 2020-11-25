import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface AuthResponseData{
     kind: string;
     idToken: string;
     email: string;
     refreshToken: string; 
     expiresIn: string;
     localId: string;
}
//Mnage token of user
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(private http: HttpClient){}

    signup(email: string, password: string){
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKM95AiZxdMZx3-HBteroXB8gyuFQZRZM',{
            email: email,
            password: password,
            returnSecureToken: true
            }
        )
    }
}