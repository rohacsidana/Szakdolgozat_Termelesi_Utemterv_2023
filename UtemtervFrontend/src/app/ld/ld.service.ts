import { Injectable } from '@angular/core';
import { Ld } from '../data-table/data-table.service';

@Injectable()
export class LdService {
  private ldData: Ld[] = [
    {
      ld_part: 1000,
      ld_expire: new Date('2023-06-05'),
      ld_qty_oh: 16,
      ld_qty_rsrv: 10,
      ld_qty_scrp: 6,
    },
    {
      ld_part: 1000,
      ld_expire: new Date('2023-05-12'),
      ld_qty_oh: 21,
      ld_qty_rsrv: 0,
      ld_qty_scrp: 7,
    },
    {
      ld_part: 1020,
      ld_expire: new Date('2023-06-14'),
      ld_qty_oh: 16,
      ld_qty_rsrv: 10,
      ld_qty_scrp: 6,
    },
    {
      ld_part: 1040,
      ld_expire: new Date('2023-03-24'),
      ld_qty_oh: 3,
      ld_qty_rsrv: 6,
      ld_qty_scrp: 12,
    },
    {
      ld_part: 1060,
      ld_expire: new Date('2023-06-06'),
      ld_qty_oh: 210,
      ld_qty_rsrv: 15,
      ld_qty_scrp: 2,
    },
    {
      ld_part: 1080,
      ld_expire: new Date('2023-08-25'),
      ld_qty_oh: 23,
      ld_qty_rsrv: 44,
      ld_qty_scrp: 2,
    },
  ];

  getLds() {
    return this.ldData.slice();
  }

  getLd(part: number, expire_d: Date): Ld {
    for (let i = 0; i < this.ldData.length; i++) {
      if (
        this.ldData[i].ld_part == part &&
        this.ldData[i].ld_expire == expire_d
      ) {
        console.log('getLd: ' + this.ldData[i]);
        return this.ldData[i];
      }
    }
  }

  saveLd(ld: Ld) {
    console.log(ld);

    if (this.getLd(ld.ld_part, ld.ld_expire)) {
      //ha létezik ilyen ld_part-ű ld, updateljuk

      this.ldData[this.ldData.indexOf(this.getLd(ld.ld_part, ld.ld_expire))] =
        ld;
      for (let i = 0; i < this.ldData.length; i++) {
        if (this.ldData[i].ld_part == ld.ld_part) {
          this.ldData[i] = ld;
        }
      }
    } else {
      this.ldData.push(ld);
    }
  }

  deleteLd(part: number, expire: Date) {
    //console.log(this.getLd(id));
    console.log(this.getLd(part, expire));

    if (this.getLd(part, expire)) {
      this.ldData.splice(this.ldData.indexOf(this.getLd(part, expire)), 1);
    }
  }
}
