import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {
  transform(value: number, currency: string = 'Ft'): string {
    if (value === null || value === undefined) {
      return '';
    }
    const formattedValue = value.toLocaleString('hu-HU');
    return `${formattedValue} ${currency}`;
  }
}