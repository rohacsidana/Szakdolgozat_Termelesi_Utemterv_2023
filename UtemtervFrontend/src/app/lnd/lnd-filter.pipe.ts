import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'lndFilterPipe'
})

export class LndFilterPipe implements PipeTransform {

  transform(value: string, filter: string, i: string, part: number): any {
    if (value.length === 0 || filter === "" || !part) {
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
