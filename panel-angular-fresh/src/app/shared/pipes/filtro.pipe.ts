import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'filtro' })
export class FiltroPipe implements PipeTransform {
  transform(items: any[], term: string, campo: string = 'nombre'): any[] {
    if (!items || !term) return items;
    return items.filter(item => item[campo]?.toLowerCase().includes(term.toLowerCase()));
  }
}
