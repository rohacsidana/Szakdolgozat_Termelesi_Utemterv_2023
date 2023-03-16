import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LnResolver } from '../ln.resolver';
import { LdFormComponent } from '../reserve/ld-form/ld-form.component';
import { Ld } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LdService {
  private ldData: Ld[] = [];
  ldDataChanged: Subject<Ld[]> = new Subject<Ld[]>();
  error: Subject<string> = new Subject<string>();

  setError(error: string) {
    this.error.next(error);
  }

  setLds(lds: Ld[]) {
    this.ldData = lds;
    this.ldDataChanged.next(this.ldData.slice());
  }

  getLds() {
    return this.ldData.slice();
  }

  getLd(part: number, expire_d: Date): Ld {
    let ld: Ld = null;
    let i: number = 0;
    while (
      i < this.ldData.length &&
      !(
        this.ldData[i].ld_part == part &&
        this.ldData[i].ld_expire.toDateString() == expire_d.toDateString()
      )
    ) {
      i++;
    }
    return i < this.ldData.length ? this.ldData[i] : null;
  }

  saveLd(ld: Ld, mode: string): boolean {
    switch (mode) {
      case 'new':
        //ha létezik ilyen ld_part-ű ld, updateljuk
        ld.ld_qty_rsrv = 0;
        ld.ld_qty_scrp = 0;
        this.ldData.push(ld);
        this.ldDataChanged.next(this.ldData.slice());
        return true;

      case 'edit':
        this.ldData[this.ldData.indexOf(this.getLd(ld.ld_part, ld.ld_expire))] =
          ld;
        this.ldDataChanged.next(this.ldData.slice());
        return true;
      default:
        break;
    }
  }

  deleteLd(part: number, expire: Date) {
    if (this.getLd(part, expire)) {
      this.ldData.splice(this.ldData.indexOf(this.getLd(part, expire)), 1);
    }
    this.ldDataChanged.next(this.ldData.slice());
  }
}
