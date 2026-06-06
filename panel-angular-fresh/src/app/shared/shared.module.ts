import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// ✅ NUEVOS MÓDULOS DE MATERIAL
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Componentes
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FiltroPipe } from './pipes/filtro.pipe';
import { MonedaPipe } from './pipes/moneda.pipe';

@NgModule({
  declarations: [
    HeaderComponent, SidebarComponent, FooterComponent, TablaComponent, ModalComponent, LoadingComponent,
    FiltroPipe, MonedaPipe
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, // ✅ Asegúrate de importar ReactiveFormsModule
    // Material Modules
    MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule,
    // ✅ Nuevos módulos de Material
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule
  ],
  exports: [
    CommonModule, RouterModule, ReactiveFormsModule, // ✅ Exportar RouterModule y ReactiveFormsModule
    // Material Modules
    MatButtonModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule,
    // ✅ Nuevos módulos de Material
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    // Componentes
    HeaderComponent, SidebarComponent, FooterComponent, TablaComponent, ModalComponent, LoadingComponent,
    FiltroPipe, MonedaPipe
  ]
})
export class SharedModule { }
