import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleosService {

  private empleosCollection: AngularFirestoreCollection<any>;

  constructor(private firestore:AngularFirestore) {
    this.empleosCollection = this.firestore.collection<any>('empleos');
   }

  public getAll(): Observable<any[]> {
    return this.empleosCollection
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

}
