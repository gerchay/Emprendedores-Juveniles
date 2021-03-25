import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  opened:boolean = true;
  isClient:boolean;
  menu:any[];

  constructor(
    private route: Router,
    private _auth:AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const tipo = JSON.parse(localStorage.getItem('TipoClient'));
    this.isClient = tipo === 'admin' ? false : true;
    this.menu = [
      { titulo: 'Usuarios', icono: 'supervisor_account', link: 'usuarios', ver: !this.isClient },
      { titulo: 'Fases', icono: 'wysiwyg', link: 'fases', ver: true },
      { titulo: 'Perfil', icono: 'folder_shared', link: 'perfil', ver: true },
      { titulo: 'Charlas', icono: 'event', link: 'charlas', ver: true },
    ];
  }

  logout(){
    this._auth.onLogout()
      .then(  rep => {
        this.route.navigate(["/inicio"]);
        localStorage.removeItem('TipoClient');
      })
      .catch( err => { this.openSnackBar('No se pudo cerrar sesión'); console.log( err )});
     // localStorage.removeItem("usuario");
  }

  openSnackBar(message:string, horizontal:any = 'end', vertical:any='top') {
    this._snackBar.open(message, 'Done', {
      duration: 4000,
      horizontalPosition: horizontal,
      verticalPosition: vertical
    });
  }
}
