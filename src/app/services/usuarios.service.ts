import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usersCollection: AngularFirestoreCollection<any>;

  constructor(private firestore:AngularFirestore) {
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
  public getOne = (id: string): Observable<any> => this.usersCollection.doc( id ).valueChanges();
  public editById = (id:string, editado:any) => this.usersCollection.doc( id ).update( editado );


}
