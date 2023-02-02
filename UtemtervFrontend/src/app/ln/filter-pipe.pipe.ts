import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  //ez a pipe a gyártósorok kereséséhez lett készítve
  transform(value: string, filter: string, i: string): any {
    //ha a keresőbe nem írunk semmit, akkor visszaadja magát az értékeket
    if (value.length === 0 || filter === "") {
      return value;
    }

    //csak azokat az értékeket adja vissza, amiknek az eleje megegyezik a filterrel 
    const talalatok = []
    for (const item of value) {
      let iStart = item[i].slice(0, filter.length)
      if (iStart === filter) {
        talalatok.push(item)
      }

    }
    return talalatok
  }

}
