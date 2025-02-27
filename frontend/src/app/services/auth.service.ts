import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth,) {}

  login(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password);
  }

  getUser(): Observable<any> {
    return this.fireauth.authState;
  }
}