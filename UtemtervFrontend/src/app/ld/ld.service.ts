import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ld } from '../data-table/data-table.service';

@Injectable({
  providedIn: 'root',
})
export class LdService {
  private ldData: Ld[] = [];
  ldDataChanged: Subject<Ld[]> = new Subject<Ld[]>();

  setLds(lds: Ld[]) {
    console.log('setting lds');
    //console.log(lds);
    this.ldData = lds;
    this.ldDataChanged.next(this.ldData.slice());
  }

  getLds() {
    return this.ldData.slice();
  }

  getLd(part: number, expire_d: Date): Ld {
    for (let i = 0; i < this.ldData.length; i++) {
      if (
        this.ldData[i].ld_part == part &&
        this.ldData[i].ld_expire.toString() == expire_d.toString()
      ) {
        //console.log('getLd: ' + this.ldData[i]);
        return this.ldData[i];
      }
    }
  }

  saveLd(ld: Ld, mode: String): boolean {
    //console.log(ld);

    switch (mode) {
      case 'new':
        if (this.getLd(ld.ld_part, ld.ld_expire)) {
          console.log('ilyen ld már létezik');
          return false;
        } else {
          //ha létezik ilyen ld_part-ű ld, updateljuk
          console.log('ilyen Ld nem létezik, hozzáadom');
          this.ldData.push(ld);
          return true;
        }
      case 'edit':
        console.log('ilyen Ld már létezik, updatelem');
        this.ldData[this.ldData.indexOf(this.getLd(ld.ld_part, ld.ld_expire))] =
          ld;
        for (let i = 0; i < this.ldData.length; i++) {
          if (
            this.ldData[i].ld_part == ld.ld_part &&
            this.ldData[i].ld_expire.toString() == ld.ld_expire.toString()
          ) {
            this.ldData[i] = ld;
          }
        }
        return true;
      default:
        break;
    }
    this.ldDataChanged.next(this.ldData.slice());
  }

  deleteLd(part: number, expire: Date) {
    if (this.getLd(part, expire)) {
      this.ldData.splice(this.ldData.indexOf(this.getLd(part, expire)), 1);
    }
    this.ldDataChanged.next(this.ldData.slice());
  }
}
