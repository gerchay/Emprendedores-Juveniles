import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: Observable<any>;
  constructor( private afAuth: AngularFireAuth ) { this.userData$ = this.afAuth.authState; }
  onLogin = ({ email, password }) => this.afAuth.signInWithEmailAndPassword( email, password );
  logout = () => this.afAuth.signOut()
}
