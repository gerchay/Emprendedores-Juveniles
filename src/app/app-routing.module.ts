import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo:'dashboard', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioModule), },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule),  canActivate : [AuthGuard]  },
  { path: '**', loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioModule), }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
