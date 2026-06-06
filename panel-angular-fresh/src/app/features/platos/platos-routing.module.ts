import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/listar/listar.component';
import { CrearComponent } from './pages/crear/crear.component';
import { EditarComponent } from './pages/editar/editar.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { RolGuard } from '../../core/guards/rol.guard';

const routes: Routes = [
  { path: '', component: ListarComponent, canActivate: [AuthGuard] },
  { path: 'crear', component: CrearComponent, canActivate: [AuthGuard, RolGuard], data: { roles: ['admin', 'proveedor'] } },
  { path: 'editar/:id', component: EditarComponent, canActivate: [AuthGuard, RolGuard], data: { roles: ['admin', 'proveedor'] } },
  { path: 'detalle/:id', component: DetalleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatosRoutingModule { }
