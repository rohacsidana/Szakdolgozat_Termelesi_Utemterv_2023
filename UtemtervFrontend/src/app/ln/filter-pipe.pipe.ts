import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: string, filter: string, i: string): any {
    if (value.length === 0 || filter === "") {
      return value;
    }

    const talalatok = []
    for (const item of value) {
      if (item[i] === filter) {
        talalatok.push(item)
      }

    }
    return talalatok
  }

}
