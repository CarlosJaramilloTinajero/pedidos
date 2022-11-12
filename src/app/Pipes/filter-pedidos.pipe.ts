import { Pipe, PipeTransform } from '@angular/core';
import { ConDia } from '../Models/con-dia';

@Pipe({
  name: 'filterPedidos'
})
export class FilterPedidosPipe implements PipeTransform {

  transform(values: ConDia[], arg: string): ConDia[] {
    let result: ConDia[] = [];
    for (const value of values) {
      if (value.domicilio.toUpperCase().indexOf(arg.toUpperCase()) > -1) {
        result = [...result, value];
      }
    }
    return result;
  }

}
