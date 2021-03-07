import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
  ]
})
export class InicioModule { }
