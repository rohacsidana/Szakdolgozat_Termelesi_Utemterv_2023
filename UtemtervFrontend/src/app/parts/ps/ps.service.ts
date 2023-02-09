import { Injectable } from '@angular/core';
import { Ps } from 'src/app/shared/interfaces';

@Injectable()
export class PartStrService {
  private partStrData: Ps[] = [
    {
      ps_par: 1,
      ps_comp: 2,
      ps_qty_per: 5,
    },
    {
      ps_par: 1,
      ps_comp: 3,
      ps_qty_per: 2,
    },
    {
      ps_par: 1,
      ps_comp: 4,
      ps_qty_per: 1,
    },
    {
      ps_par: 2,
      ps_comp: 6,
      ps_qty_per: 35,
    },
    {
      ps_par: 2,
      ps_comp: 7,
      ps_qty_per: 6,
    },
  ];

  getPartStrs() {
    return this.partStrData.slice();
  }

  getPartStr(par: number, comp: number): Ps {
    for (let i = 0; i < this.partStrData.length; i++) {
      if (
        this.partStrData[i].ps_par == par &&
        this.partStrData[i].ps_comp == comp
      ) {
        return this.partStrData[i];
      }
    }
  }

  savePartStr(partStr: Ps) {
    if (this.getPartStr(partStr.ps_par, partStr.ps_comp)) {
      console.log('Ps already exists, updating it');

      //ha létezik ilyen pt_part-tel part, updateljuk
      this.partStrData[
        this.partStrData.indexOf(
          this.getPartStr(partStr.ps_par, partStr.ps_comp)
        )
      ].ps_qty_per = partStr.ps_qty_per;
    } else {
      this.partStrData.push(partStr);
    }
  }

  deletePartStr(par: number, comp: number) {
    console.log(this.getPartStr(par, comp));

    if (this.getPartStr(par, comp)) {
      this.partStrData.splice(
        this.partStrData.indexOf(this.getPartStr(par, comp)),
        1
      );
    }
  }
}
