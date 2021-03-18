import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FASE } from '../models/fases';

@Injectable({
  providedIn: 'root'
})
export class FasesService {

  private fasesCollection: AngularFirestoreCollection<any>;

  constructor(private firestore:AngularFirestore, ) {
    this.fasesCollection = this.firestore.collection<any>('fases');
  }

  public getAll(): Observable<any[]> {
    return this.fasesCollection
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

  public deleteById = ( id:string ) => this.fasesCollection.doc( id ).delete();
  public getOne = (id: string): Observable<FASE> => this.fasesCollection.doc( id ).valueChanges();
  public editById = (id:string, editado:any) => this.fasesCollection.doc( id ).update( editado );
  public save = ( nuevo:FASE ) => this.fasesCollection.add( Object.assign({}, nuevo ) );
}
