import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ps, psDisplay, Pt } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PartStrService {
  private partStrData: Ps[] = [];
  //private displayedData: [];
  partStrDataChanged: Subject<Ps[]> = new Subject<Ps[]>();

  setPartStrs(psData: Ps[]) {
    console.log('setting ps');
    this.partStrData = psData;
    //console.log(this.partStrData);
    this.partStrDataChanged.next(this.partStrData.slice());
  }

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
    this.partStrDataChanged.next(this.partStrData.slice());
  }

  deletePartStr(par: number, comp: number) {
    console.log("Ps to delete:");
    console.log(this.getPartStr(par, comp));

    if (this.getPartStr(par, comp)) {
      this.partStrData.splice(
        this.partStrData.indexOf(this.getPartStr(par, comp)),
        1
      );
    }
    this.partStrDataChanged.next(this.partStrData.slice());
  }
}
