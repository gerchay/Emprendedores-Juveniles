import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { USUARIO } from '../models/usuario';
import { UsuariosService } from './usuarios.service';
import { FileI } from '../models/usuario';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';//otra forma para mostrar el usuario

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private filePath: string;
  userData$: Observable<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private _usuarios: UsuariosService
  )
  {
    this.userData$ = this.afAuth.authState;
  }

  onLogin = ({ email, password }) => this.afAuth.signInWithEmailAndPassword( email, password );
  onLogout = () => this.afAuth.signOut();

  async onRegister( usuario:USUARIO, password:string ):Promise<{ success:boolean, message:string}>{
    try {
      let respuesta:any;
      const { user } = await this.afAuth.createUserWithEmailAndPassword( usuario.correo, password );
      await user.updateProfile({ displayName: usuario.nombres });
      await this.firestore.collection( 'usuarios' ).doc( user.uid ).set( Object.assign({}, usuario) )
        .then( resp => {
          localStorage.setItem('TipoClient',JSON.stringify( usuario.tipo ) );
          respuesta = { success:true, message:'¡Bienvenido!'}
        })
        .catch( err =>{ respuesta = { success:false, message:'No se pudo Registrar'}; console.error(err); } )

      return respuesta || { success:false, message:'No se pudo Registrar'};

    } catch ({ code, message}) {
      console.error('Error on register', message);
      switch( code ){
        case "auth/email-already-in-use":
          return { success:false, message:'Ya existe una cuenta con la dirección de correo electrónico'};
        case "auth/invalid-email":
          return { success:false, message:'La dirección de correo electrónico no es válida'};
        case "auth/operation-not-allowed":
          return { success:false, message:'No se pudo Registrar'};
        case "auth/weak-password":
          return { success:false, message:'La contraseña no es lo suficientemente segura'};
      }
    }
  }



  //estos metodos sirven para el perfil
 /* preSaveUserProfile(user: USUARIO, image?: FileI): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage(user: USUARIO, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        })
      ).subscribe();
  }


  private saveUserProfile(user: USUARIO) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.nombres,
      photoURL: user.photoURL
    })
      .then(() => console.log('User updated!'))
      .catch(err => console.log('Error', err));
  }*/


  //intentando otra forma de mostrar los usuarios
  isAuth() {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

}




