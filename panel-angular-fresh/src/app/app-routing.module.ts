// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'restaurantes', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'restaurantes', loadChildren: () => import('./features/restaurantes/restaurantes.module').then(m => m.RestaurantesModule), canActivate: [AuthGuard] },
  { path: 'platos', loadChildren: () => import('./features/platos/platos.module').then(m => m.PlatosModule), canActivate: [AuthGuard] },
  { path: 'recetas', loadChildren: () => import('./features/recetas/recetas.module').then(m => m.RecetasModule), canActivate: [AuthGuard] },
  { path: 'talleres', loadChildren: () => import('./features/talleres/talleres.module').then(m => m.TalleresModule), canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: () => import('./features/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'restaurantes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
