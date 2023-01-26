
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as DataTableService from '../../../data-table/data-table.service';
import { Subscription } from "rxjs";
import { Sort } from "@angular/material/sort";
import { WoService } from "../../wo.service";

@Component({
  selector: 'app-lad',
  templateUrl: 'lad.component.html',
  styleUrls: ['lad.component.css'],
  providers: [DataTableService.DataTableService]
})

export class LadComponent implements OnInit, OnDestroy {
  ladData: DataTableService.Lad[] = [];
  ladHeaders: { name: string, szoveg: string }[] = [
    { name: 'lad_id', szoveg: 'Foglalás azonosító' },
    { name: 'lad_part', szoveg: 'Wod_part' },
    { name: 'lad_par', szoveg: 'Wod_par' },
    { name: 'lad_lot', szoveg: 'Wod_lot' },
    { name: 'lad_comp', szoveg: 'Ld_part' },
    { name: 'lad_expire', szoveg: 'Ld_expire' },
    { name: 'lad_qty_rsrv', szoveg: 'Foglalt mennyiség ' }
  ];

  sortedLadData: DataTableService.Lad[];
  getItemSub: Subscription;
  sortSub: Subscription;
  ladSub: Subscription;
  lastSort: Sort;
  constructor(private dtTblService: DataTableService.DataTableService, private woService: WoService) {
    //this.sortedLadData = this.ladData.slice();
  }

  ngOnInit() {
    this.ladSub = this.woService.ladDataChanged.subscribe(
      (ladData: DataTableService.Lad[]) => {
        this.ladData = ladData;
      }
    );
    this.ladData = this.woService.getLads();
    this.sortedLadData = this.ladData.slice();

    this.getItemSub = this.dtTblService.getData.subscribe(() => {
      this.dtTblService.emitDataChanged(this.sortedLadData.slice());
    });
    this.dtTblService.emitDataChanged(this.sortedLadData.slice());
    this.sortSub = this.dtTblService.sortData.subscribe(
      (sort: Sort) => {
        this.lastSort = sort;
        this.sortData(sort);
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.ladData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedLadData = data;
      this.dtTblService.emitDataChanged(this.sortedLadData.slice());
      return;
    }

    this.sortedLadData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'lad_id':
          return this.compare(a.lad_id, b.lad_id, isAsc);
        case 'lad_part':
          return this.compare(a.lad_part, b.lad_part, isAsc);
        case 'lad_par':
          return this.compare(a.lad_par, b.lad_par, isAsc);
        case 'lad_lot':
          return this.compare(a.lad_lot, b.lad_lot, isAsc);
        case 'lad_comp':
          return this.compare(a.lad_comp, b.lad_comp, isAsc);
        case 'lad_expire':
          return this.compare(a.lad_expire, b.lad_expire, isAsc);
        case 'lad_qty_rsrv':
          return this.compare(a.lad_qty_rsrv, b.lad_qty_rsrv, isAsc);

        default:
          return 0;
      }
    });

    this.sortedLadData = data.slice();
    this.dtTblService.emitDataChanged(this.sortedLadData.slice());
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {
    this.getItemSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.ladSub.unsubscribe();
  }

}
