import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USUARIO } from 'src/app/models/usuario';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hide2 = true;
  nuevo:USUARIO = { };
  password:string = '';
  password2:string = '';

  constructor(private route: Router) { }
  ngOnInit(): void { }


  onRegister( ) {
    this.route.navigate(['/']);
  }

}
