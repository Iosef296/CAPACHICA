import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [CommonModule, ReactiveFormsModule, PerfilRoutingModule, SharedModule]
})
export class PerfilModule { }
