import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FasesComponent } from './fases/fases.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CharlasComponent } from './charlas/charlas.component';
import { GrabacionesComponent } from './grabaciones/grabaciones.component';
import { BolsaEmpleoComponent } from './bolsa-empleo/bolsa-empleo.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    children: [
      { path: 'usuarios', component: UsuariosComponent  },
      { path: 'fases', component: FasesComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'charlas', component: CharlasComponent },
      { path: 'grabaciones', component: GrabacionesComponent },
      { path: 'bolsaempleo', component: BolsaEmpleoComponent },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
