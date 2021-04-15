import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FASE } from '../models/fases';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  private RecursosCollection: AngularFirestoreCollection<any>;

  constructor(private firestore:AngularFirestore, ) {
    this.RecursosCollection = this.firestore.collection<any>('recursos');
  }

  public getAll(): Observable<any[]> {
    return this.RecursosCollection
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

  public deleteById = ( id:string ) => this.RecursosCollection.doc( id ).delete();
  public getOne = (id: string): Observable<FASE> => this.RecursosCollection.doc( id ).valueChanges();
  public editById = (id:string, editado:any) => this.RecursosCollection.doc( id ).update( editado );
  public save = ( nuevo:FASE ) => this.RecursosCollection.add( Object.assign({}, nuevo ) );
}
