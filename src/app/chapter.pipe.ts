import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chapter'
})
export class ChapterPipe implements PipeTransform {

  lastOne;

  transform(value: any, args?: any): any {
    const values = value.split('/');
    if (this.lastOne !== values[1]) {
      this.lastOne = values[1];
      return 'Chapitre ' + values[1];
    }
    return null;
  }

}
