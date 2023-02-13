import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { HttpClient } from '@angular/common/http';

import { TokenService } from './token.service';

import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private token: TokenService
  ) { }

  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  hasUser() {
    return this.auth.authState;
  }

  //cualquier cosa referente a la autentificacion se hace por metodo post
  loginRestApi(email: string, password: string) {
    return this.http.post('https://platzi-store.herokuapp.com/auth', {
      email,
      password
    }).
    pipe(
      tap((data: {token: string}) => {
        const token = data.token;
        this.token.saveToken(token);
      })
    );
  }
}
