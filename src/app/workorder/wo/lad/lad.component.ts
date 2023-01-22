
import { Component, OnDestroy, OnInit } from "@angular/core";
import * as DataTableService from '../../../data-table/data-table.service';
import { Subscription } from "rxjs";
import { Sort } from "@angular/material/sort";

@Component({
    selector: 'app-lad',
    templateUrl: 'lad.component.html',
    styleUrls: ['lad.component.css'],
    providers: [DataTableService.DataTableService]
})

export class LadComponent implements OnInit, OnDestroy{
    ladData:DataTableService.Lad[] = [
        {  lad_id: 0, lad_part: 1, lad_par: 2, lad_lot: 10, lad_comp:2112300, lad_expire:22 , lad_qty_rsrv: 21}  ,
        {  lad_id: 1, lad_part: 14, lad_par: 12, lad_lot: 10, lad_comp:21002, lad_expire:20 , lad_qty_rsrv: 10}  ,
        {  lad_id: 2, lad_part: 1, lad_par: 2, lad_lot: 10, lad_comp:21020, lad_expire:1321 , lad_qty_rsrv: 13}  ,
        {  lad_id: 3, lad_part: 11, lad_par: 25, lad_lot: 10, lad_comp:21020, lad_expire:22 , lad_qty_rsrv: 14}  ,
        {  lad_id: 0, lad_part: 11, lad_par: 21, lad_lot: 10, lad_comp:210220, lad_expire:22 , lad_qty_rsrv: 1}  ,
        {  lad_id: 9, lad_part: 1231, lad_par: 223, lad_lot: 10, lad_comp:21200, lad_expire:22 , lad_qty_rsrv: 311}  ,
    ];
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
    constructor(private dtTblService: DataTableService.DataTableService) {
      this.sortedLadData = this.ladData.slice();
    }
  
    ngOnInit() {
      this.getItemSub = this.dtTblService.getData.subscribe(() => {
        this.dtTblService.emitDataChanged(this.sortedLadData.slice());
      });
      this.dtTblService.emitDataChanged(this.sortedLadData.slice());
      this.sortSub = this.dtTblService.sortData.subscribe(
        (sort: Sort)=>{
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
    }

}

