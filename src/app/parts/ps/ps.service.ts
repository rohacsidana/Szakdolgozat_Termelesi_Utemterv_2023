import { Injectable } from '@angular/core';
import { Ps } from 'src/app/data-table/data-table.service';

@Injectable()
export class PartStrService {
  private partStrData: Ps[] = [
    {
      ps_par: 0,
      ps_comp: 0,
      ps_qty_per: 0,
    },
  ];

  getParts() {
    return this.partStrData.slice();
  }

  getPart(par: number, comp: number): Ps {
    for (let i = 0; i < this.partStrData.length; i++) {
      if (
        this.partStrData[i].ps_par == par &&
        this.partStrData[i].ps_par == comp
      ) {
        return this.partStrData[i];
      }
    }
  }

  savePart(partStr: Ps) {
    if (this.getPart(partStr.ps_par, partStr.ps_comp)) {
      //ha létezik ilyen pt_part-tel part, updateljuk
      for (let i = 0; i < this.partStrData.length; i++) {
        if (
          this.partStrData[i].ps_par == partStr.ps_par &&
          this.partStrData[i].ps_par == partStr.ps_comp
        ) {
          this.partStrData[i] = partStr;
        }
      }
    } else {
      this.partStrData.push(partStr);
    }
  }

  deletePart(par: number, comp: number) {
    console.log(this.getPart(par, comp));

    if (this.getPart(par, comp)) {
      this.partStrData.splice(
        this.partStrData.indexOf(this.getPart(par, comp)),
        1
      );
    }
  }
}
