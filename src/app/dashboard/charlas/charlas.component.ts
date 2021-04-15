import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';//para calendario de las charlas

import { Charla } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-charlas',
  templateUrl: './charlas.component.html',
  styleUrls: ['./charlas.component.scss'],
 
  
})
export class CharlasComponent implements OnInit {

  public isDisabled= true;
  isClient:boolean;

  nuevacharla:Charla = {
    descripcion:"",
    enlace: "",
    fecha: "",
    hora: "",

   };

  
 public ListaCharlas=[];
 calendarOptions: CalendarOptions;
 

  public charlas = [
    
      { title: 'evento de marketing', 
        start: '2021-03-24' ,
        end:'2021-03-27',
      },
      { title: 'hoy gran webinar sobre emprendimiento', 
        start: '2021-02-05T10:30',
        end: '2021-02-05T11:30' 
      },
      { title: 'taller sobre ventas', 
        start: '03-05-2021T10:30:00',
        end: '03-05-2021T11:30:00' }

    ]
  
  constructor(
    private ServicioCharla:AuthService,
    private _snackBar: MatSnackBar,
    private route: Router,
    ) { 

  }


  ngOnInit(): void {

    const tipo = JSON.parse(localStorage.getItem('TipoClient'));
   // this.isClient = tipo === 'admin'

    if (tipo==='student'){
      this.isDisabled=true;
    }else{
      this.isDisabled=false;
    }



    this.ServicioCharla.ObtenerCharlas().subscribe((charlasSnapshot) => {
      
      charlasSnapshot.forEach((charlaData: any) => {
        
        this.ingresar_evento(charlaData.payload.doc.data());
        
      })
    });

  

    setTimeout(() => {
      this.calendarOptions = {
     initialView: 'dayGridMonth',
     eventBackgroundColor:'#1E8449 ',
    eventTextColor:'#FDFEFE' ,
    displayEventEnd:true,
    eventClick: function(info) {
      alert(
       'DESCRIPCION: ' + info.event.title+'\n\n'
       
       );},
    // dateClick: this.handleDateClick.bind(this), // bind is important!
     events: this.ListaCharlas
     };
   }, 2000);

  }


  RegistroCharla( ) {

    if( this.comprobarInput() === false) return;
    
    this.ServicioCharla.crearcharla(this.nuevacharla)
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
  



  ingresar_evento (datos:any):void {
    
    this.ListaCharlas.push( 
      {title: datos.descripcion+" \n\nENLACE: "+datos.enlace+"\n\nHORA: "+datos.hora,
      start: datos.fecha,
      end: datos.fecha});

     /* for (let clave of this.ListaCharlas){
        console.log("Lista Charlas--> ",clave);
      }*/
  }


  handleDateClick(arg) {
    alert('Descripcion: ' + arg.event.title)
  }


  comprobarInput():boolean {
    const RE = /\S+@\S+\.\S+/ ;
    
    if( !this.nuevacharla.descripcion ){
      this.openSnackBar('Ingrese una descripcion');
      return false;
    }
    if( !this.nuevacharla.enlace ){
      this.openSnackBar('Ingrese un enlace');
      return false;
    }
    if( !this.nuevacharla.fecha ){
      this.openSnackBar('Ingrese una fecha');
      return false;
    }
    if( !this.nuevacharla.hora ){
      this.openSnackBar('Ingrese un horario');
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
