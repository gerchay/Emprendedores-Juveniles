import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { USUARIO } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData$: Observable<any>;
  constructor( private afAuth: AngularFireAuth, private firestore: AngularFirestore, ) { this.userData$ = this.afAuth.authState; }
  onLogin = ({ email, password }) => this.afAuth.signInWithEmailAndPassword( email, password );
  logout = () => this.afAuth.signOut();

  async onRegister( usuario:USUARIO, password:string ){
    try {
      let respuesta:boolean;
      const { user } = await this.afAuth.createUserWithEmailAndPassword( usuario.correo, password );
      await user.updateProfile({ displayName: usuario.nombres });
      await this.firestore.collection( 'usuarios' ).doc( user.uid ).set( Object.assign({}, usuario) )
        .then( resp => respuesta = true )
        .catch( err =>{ respuesta = false; console.error(err); } )

      return respuesta || false;

    } catch (error) {
      console.error('Error on register', error);
      if(error.message == 'The email address is already in use by another account.') console.log( usuario.correo );
      return false;
    }
  }
}
