import { Component, OnInit } from '@angular/core';
import { Grabacion } from 'src/app/models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-grabaciones',
  templateUrl: './grabaciones.component.html',
  styleUrls: ['./grabaciones.component.scss']
})
export class GrabacionesComponent implements OnInit {

  public ListaGrabaciones=[];
  public isDisabled= true;
  isClient:boolean;

  nuevagrabacion:Grabacion = {
    Descripcion:"",
    Enlace: "",
   };


  constructor(
    private ServicioGrabacion:AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    const tipo = JSON.parse(localStorage.getItem('TipoClient'));
   // this.isClient = tipo === 'admin'

    if (tipo==='student'){
      this.isDisabled=true;
    }else{
      this.isDisabled=false;
    }


    this.ServicioGrabacion.ObtenerGrabacion().subscribe((grabacionesSnapshot) => {
      
     this.ListaGrabaciones = [];
      grabacionesSnapshot.forEach((grabacionData: any) => {
        
        this.ListaGrabaciones.push({
          id: grabacionData.payload.doc.id,
          data: grabacionData.payload.doc.data()
        });
        //this.ingresar_grabacion(grabacionData.payload.doc.data());
       // console.log("DATA--> ",this.ListaGrabaciones);
      })
    });

    

  }


  RegistroGrabacion(){

    if( this.comprobarInput() === false) return;
    
    this.ServicioGrabacion.CrearGrabacion(this.nuevagrabacion)
    .then(

      ({ success, message}) =>{
        if( success ){
          this.openSnackBar(message);
         // this.route.navigate(['/dashboard/charlas']);
          //console.log("Correcto: ",message);
        }else{
          this.openSnackBar(message);
         // console.log("Incorrecto: ",message);
        }
      }
      

    )

  }

  ingresar_grabacion (datos:any):void {
    
    this.ListaGrabaciones.push( 
      datos);

      //console.log("descripcion--->",datos.data.descripcion);
      //console.log("enlace--->",datos.data.enlace);
  }

  comprobarInput():boolean {
    const RE = /\S+@\S+\.\S+/ ;
    
    if( !this.nuevagrabacion.Descripcion ){
      this.openSnackBar('Ingrese una descripcion o un titulo');
      return false;
    }
    if( !this.nuevagrabacion.Enlace ){
      this.openSnackBar('Ingrese un enlace de una grabacion');
      return false;
    }
   
    return true;
  }

  openSnackBar(message:string, horizontal:any = 'end', vertical:any='top') {
    this._snackBar.open(message, 'Done', {
      duration: 4000,
      horizontalPosition: horizontal,
      verticalPosition: vertical
    });
  }







}
