import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FasesComponent } from './fases/fases.component'; // FORMULARIOS REACTIVOS
import { UsuariosService } from '../services/usuarios.service';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    FasesComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    UsuariosService,
  ]
})
export class DashboardModule { }
