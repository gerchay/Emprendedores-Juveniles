import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FasesComponent } from './fases/fases.component'; // FORMULARIOS REACTIVOS
import { UsuariosService } from '../services/usuarios.service';
import { PerfilComponent } from './perfil/perfil.component';

import { RecursosComponent } from './recursos/recursos.component';

import { CharlasComponent } from './charlas/charlas.component';
import { FullCalendarModule } from '@fullcalendar/angular'; //para calendario de las charlas
import dayGridPlugin from '@fullcalendar/daygrid'; //para calendario de las charlas
import interactionPlugin from '@fullcalendar/interaction';
import { GrabacionesComponent } from './grabaciones/grabaciones.component';//para calendario de las charlas


FullCalendarModule.registerPlugins([ //para calendario de las charlas
  dayGridPlugin,
  interactionPlugin,
]);


@NgModule({
  declarations: [
    UsuariosComponent,
    FasesComponent,
    PerfilComponent,
    RecursosComponent,

    CharlasComponent,

    GrabacionesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,//para calendario de las charlas
  ],
  providers:[
    UsuariosService,
  ]
})
export class DashboardModule { }
