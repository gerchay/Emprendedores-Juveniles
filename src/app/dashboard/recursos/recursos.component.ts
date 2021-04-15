import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import Swal from 'sweetalert2';
import { FASE } from 'src/app/models/fases';
import { RecursosService } from 'src/app/services/recursos.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.scss']
})
export class RecursosComponent implements OnInit {

  fases:any[] = [];
  titulo:string = '';
  url:string = '';
  subir:boolean = true;
  focused = false;
  private datosDocumento = new FormData();
  isAdmin:boolean;
  constructor(
    private _recursos:RecursosService,
    private _archivos:ArchivosService,
  ) { }

  ngOnInit(): void {
    this._recursos.getAll().subscribe( fass => this.fases = fass );
    const tipo = JSON.parse(localStorage.getItem('TipoClient'));
    this.isAdmin = tipo === 'admin' ? true : false;

  }

  upload(event) {
    const nombre:string = event.target.files[0].name;
    this.datosDocumento.delete('archivo');
    this.datosDocumento.append('archivo', event.target.files[0], event.target.files[0].name);

    if( event.target.files[0].type !== 'application/pdf')
      return Swal.fire('¡Ingrese solo documentos PDF!', '', 'warning');

    let archivo = this.datosDocumento.get('archivo');
    this._archivos.tareaCloudStorage( "documents/" + nombre, archivo)
      .then(snapshot => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          this.url = downloadUrl;
          this.titulo = nombre.split('.')[0];
          this.subir = false;
          Swal.fire('¡Excelente!', 'Se cargo el documento. Ahora confirme su Titulo', 'success');
        })
      })
      .catch(err => {
        console.error('Error del sistema de archivos!', err )
        Swal.fire('¡Error!', 'El nombre del archivo debe ser simple y no incluir caracteres específicos', 'error');
      })
  }

  generateUUID(): any {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  Guardar(){
    if( this.titulo === '' )
      return Swal.fire('¡Advertencia!', 'Ingrese un Titulo', 'warning');

    if(this.url === '')
      return Swal.fire('¡Advertencia!', 'Ingrese un documento o espere que cargue', 'warning');

    let plan:FASE = { fecha: 0, titulo: '', url: '', };
    plan.fecha = Date.now();
    plan.titulo = this.titulo;
    plan.url = this.url;

    this._recursos.save( plan )
      .then( resp => {
          Swal.fire('¡Excelente!', 'Se guardo ' + this.titulo, 'success');
          this.url='';
          this.titulo = ''
          this.subir = true
      })
      .catch( err => {
        console.log( 'Error al cargar recurso ', err )
        Swal.fire('¡Error!', 'No se pudo guardar el recurso  ' + this.titulo, 'error');
      })
  }

}
