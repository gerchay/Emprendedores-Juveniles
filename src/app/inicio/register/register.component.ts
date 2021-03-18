import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { USUARIO } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  nuevo:USUARIO = { };
  password:string = '';

  constructor(
    private route: Router,
    private _snackBar: MatSnackBar,
    private _auth:AuthService,
  ) { }
  ngOnInit(): void { }


  onRegister( ) {
    //console.log( this.nuevo );
    if( this.comprobarInput() === false) return;

    this.nuevo.tipo = 'student';
    this._auth.onRegister( this.nuevo, this.password )
      .then( ({ success, message}) =>{
        if( success ){
          this.openSnackBar(message);
          this.route.navigate(['/dashboard']);
        }else{
          this.openSnackBar(message);
        }
      })
  }

  comprobarInput():boolean {
    const RE = /\S+@\S+\.\S+/ ;
    if( !this.nuevo.cui ){
      this.openSnackBar('Ingrese su CUI');
      return false;
    }
    if( !this.nuevo.carnet ){
      this.openSnackBar('Ingrese su Carnet');
      return false;
    }
    if( !this.nuevo.nombres ){
      this.openSnackBar('Ingrese su Nombre');
      return false;
    }
    if( !this.nuevo.apellidos ){
      this.openSnackBar('Ingrese su Apellido');
      return false;
    }
    if( !this.nuevo.escuela ){
      this.openSnackBar('Ingrese su Carrera');
      return false;
    }
    if( !this.nuevo.telefono ){
      this.openSnackBar('Ingrese su Telefono');
      return false;
    }
    if( !this.nuevo.correo ){
      this.openSnackBar('Ingrese su Correo');
      return false;
    }
    if( this.password === '' ){
      this.openSnackBar('Ingrese su Contraseña');
      return false;
    }

    if(!RE.test( this.nuevo.correo )){
      this.openSnackBar('El correo debe ser valido');
      return false;
    }

    if( this.password.length < 6){
      this.openSnackBar('La contraseña debe tener minimo 6 caracteres');
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
