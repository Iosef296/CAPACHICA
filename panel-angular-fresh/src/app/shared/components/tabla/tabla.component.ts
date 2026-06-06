import { Component, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html'
})
export class TablaComponent implements AfterViewInit {
  @Input() columnas: { titulo: string; campo: string }[] = [];
  @Input() set datos(val: any[]) { this.dataSource.data = val; }
  @Input() mostrarAcciones = true;

  @Output() editar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();


  @Output() aprobar = new EventEmitter<any>();

  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
  columnasMostrar: string[] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.columnasMostrar = this.columnas.map(c => c.campo);
      if (this.mostrarAcciones) this.columnasMostrar.push('acciones');
    });
  }
}
