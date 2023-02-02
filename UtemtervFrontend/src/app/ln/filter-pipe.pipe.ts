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
      let iStart = item[i].slice(0, filter.length)
      let filterStart = filter.slice(0, filter.length)
      if (iStart === filterStart) {
        talalatok.push(item)
      }

    }
    return talalatok
  }

}
