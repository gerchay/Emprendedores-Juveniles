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

  constructor(
    private route: Router,
    private _auth:AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this._auth.onLogout()
      .then(  rep => this.route.navigate(["/inicio"]) )
      .catch( err => { this.openSnackBar('No se pudo cerrar sesión'); console.log( err )});
  }

  openSnackBar(message:string, horizontal:any = 'end', vertical:any='top') {
    this._snackBar.open(message, 'Done', {
      duration: 4000,
      horizontalPosition: horizontal,
      verticalPosition: vertical
    });
  }
}
