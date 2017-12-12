import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'part'
})
export class PartPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const values = value.split('/');
    if (values.length === 3) {
      return 'Partie ' + values[2];
    }
    return null;
  }

}
