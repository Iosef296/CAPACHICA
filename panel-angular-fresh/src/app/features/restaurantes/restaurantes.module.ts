import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Ya está
import { RestaurantesRoutingModule } from './restaurantes-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { CrearComponent } from './pages/crear/crear.component';
import { EditarComponent } from './pages/editar/editar.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ListarComponent, CrearComponent, EditarComponent, DetalleComponent],
  imports: [CommonModule, ReactiveFormsModule, RestaurantesRoutingModule, SharedModule]
})
export class RestaurantesModule { }
