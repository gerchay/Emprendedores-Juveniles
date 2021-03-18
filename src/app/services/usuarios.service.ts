import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { USUARIO } from '../models/usuario';


//se agrego para el perfil
import { USUARIO} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usersCollection: AngularFirestoreCollection<any>;

  constructor(private firestore:AngularFirestore, ) {
    this.usersCollection = this.firestore.collection<any>('usuarios');
  }

  public getAll(): Observable<any[]> {
    return this.usersCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  public deleteById = ( id:string ) => this.usersCollection.doc( id ).delete();
  public getOne = (id: string): Observable<USUARIO> => this.usersCollection.doc( id ).valueChanges();
  public editById = (id:string, editado:any) => this.usersCollection.doc( id ).update( editado );

  public buscarTipo = ( id:string ) => {
    this.getOne( id )
      .subscribe(
        user => localStorage.setItem('TipoClient',JSON.stringify( user.tipo ) ),
        err => console.error( err )
      )
  }

  //se agrego para usarlo en el perfil
  public getOnePost(id: USUARIO): Observable<USUARIO> {
    return this.firestore.doc<USUARIO>(`perfil/${id}`).valueChanges();
  }
  public buscarUsuario = ( id:string ) => {
     this.getOne( id )
      .subscribe(
        user =>{
          console.log( user );
          localStorage.setItem('usuario',JSON.stringify( user ) );
          
          //JSON.parse(localStorage.getItem('TipoClient'));
        },
        err => console.error( err )
      )
  }

}
