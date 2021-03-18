import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  constructor( private storage: AngularFireStorage ) { }
  //Tarea para subir archivo
  tareaCloudStorage = (nombreArchivo: string, datos: any) => this.storage.upload(nombreArchivo, datos);
  //Referencia del archivo
  referenciaCloudStorage = (nombreArchivo: string) => this.storage.ref(nombreArchivo);

}
