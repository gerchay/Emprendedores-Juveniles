import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide:boolean = true;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private route: Router,
    private _auth:AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  }

  onLogin(form: {email:string,password:string}) {
    this._auth.onLogin( form )
      .then(res => {
        //console.log('Successfully', res);
        this.openSnackBar('¡Bienvenido!');
        this.route.navigate(['/dashboard']);
      })
      .catch(
        ({ code, message}) => {
          console.log('Error Login', message );
          switch( code ){
            case "auth/invalid-email":
                this.openSnackBar('Correo incorrecto');
              break;
            case "auth/user-disabled":
                this.openSnackBar('Correo deshabilitado.');
              break;
            case "auth/user-not-found":
                this.openSnackBar('El correo no existe');
              break;
            case "auth/wrong-password":
                this.openSnackBar('Contraseña incorrecta');
              break;
          }
        }
      );
  }

  openSnackBar(message:string, horizontal:any = 'end', vertical:any='top') {
    this._snackBar.open(message, 'Done', {
      duration: 5000,
      horizontalPosition: horizontal,
      verticalPosition: vertical
    });
  }
}
