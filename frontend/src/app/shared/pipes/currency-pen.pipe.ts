import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPen',
  standalone: true
})
export class CurrencyPenPipe implements PipeTransform {
  // Formatear precios numéricos en el formato estándar de Soles Peruanos (S/.)
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) {
      return 'S/. 0.00';
    }
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) {
      return 'S/. 0.00';
    }
    return `S/. ${num.toFixed(2)}`;
  }
}
