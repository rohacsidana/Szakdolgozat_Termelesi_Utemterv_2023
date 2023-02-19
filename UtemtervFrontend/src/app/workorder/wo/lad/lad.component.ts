import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as DataTableService from '../../../data-table/data-table.service';
import { Subscription, throwError } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { WoService } from '../../wo.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Lad } from 'src/app/shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lad',
  templateUrl: 'lad.component.html',
  styleUrls: ['lad.component.css'],
  providers: [DataTableService.DataTableService],
})
export class LadComponent implements OnInit, OnDestroy {
  ladHeadersNotCompl = [
    { name: 'lad_id', szoveg: 'Foglalás azonosító' },
    { name: 'lad_part', szoveg: 'Wod_part' },
    { name: 'lad_par', szoveg: 'Wod_par' },
    { name: 'lad_lot', szoveg: 'Wod_lot' },
    { name: 'lad_comp', szoveg: 'Ld_part' },
    { name: 'lad_expire', szoveg: 'Ld_expire' },
    { name: 'lad_qty_rsrv', szoveg: 'Foglalt mennyiség' },
    { name: 'lad_qty_used', szoveg: 'Felhasznált mennyiség' },
  ];
  ladHeadersCompleted = [
    { name: 'lad_id', szoveg: 'Foglalás azonosító' },
    { name: 'lad_part', szoveg: 'Wod_part' },
    { name: 'lad_par', szoveg: 'Wod_par' },
    { name: 'lad_lot', szoveg: 'Wod_lot' },
    { name: 'lad_comp', szoveg: 'Ld_part' },
    { name: 'lad_expire', szoveg: 'Ld_expire' },
    { name: 'lad_qty_rsrv', szoveg: 'Foglalt mennyiség' },
    {
      name: 'lad_qty_used',
      szoveg: 'Felhasznált mennyiség',
      input: { type: 'number' },
    },
  ];

  ladHeaders: { name: string; szoveg: string; input?: { type: string } }[] =
    this.ladHeadersNotCompl;

  ladData: Lad[] = [];
  sortedLadData: Lad[] = [];
  lastSort: Sort;

  sortSub: Subscription;
  ladSub: Subscription;
  woGetSub: Subscription;
  selectedChanged: Subscription;
  inputDataChanged: Subscription;

  constructor(
    private dtTblService: DataTableService.DataTableService,
    private woService: WoService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.inputDataChanged = this.dtTblService.inputDataChanged.subscribe(
      (data) => {
        this.dataStorageService
          .updateLad(data)
          .pipe(
            tap({
              next: () => this.woService.updateLad(data),
              error: (error) => {
                this.handleError(error);
                console.log(this.ladData);
                
                if (!!this.lastSort) {

                  this.sortedLadData = this.ladData.map((value)=>{return {...value}});
                  this.sortData(this.lastSort);
                } else {

                  this.sortedLadData = this.ladData.map((value)=>{return {...value}});
                  this.dtTblService.emitDataChanged([...this.sortedLadData]);
                }
              },
            })
          )
          .subscribe();
      }
    );
    this.selectedChanged = this.woService.selectedWoChanged.subscribe(
      (data) => {
        const newStatus = data.wo_status;
        if (newStatus === 'completed') {
          this.ladHeaders = this.ladHeadersCompleted;
        } else {
          this.ladHeaders = this.ladHeadersNotCompl;
        }
      }
    );
    this.ladSub = this.woService.ladDataChanged.subscribe((ladData: Lad[]) => {
      this.ladData = ladData;
      if (!!this.lastSort) {
        this.sortedLadData = this.ladData.map((value)=>{return {...value}});
        this.sortData(this.lastSort);
      } else {
        this.sortedLadData = this.ladData.map((value)=>{return {...value}});
        this.dtTblService.emitDataChanged([...this.sortedLadData]);
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.dataStorageService
        .fetchLad(+params['lot'])
        .pipe(
          tap({
            next: (data) => this.woService.setLadData([...data]),
            error: (error) => {
              if (this.woService.woError === null) {
                this.woService.setLadData([]);
              }
              return throwError(error.error);
            },
          })
        )
        .subscribe();
    });

    this.dtTblService.emitDataChanged([...this.sortedLadData]);
    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.lastSort = sort;
      this.sortData(sort);
    });

    this.woGetSub = this.woService.getDataFromTable.subscribe(() => {
      this.woService.setLadData([...this.dtTblService.getChangedData()]);
    });
  }

  sortData(sort: Sort) {
    const data = this.ladData.map((value)=>{return {...value}});
    if (!sort.active || sort.direction === '') {
      this.sortedLadData = data;
      this.dtTblService.emitDataChanged([...this.sortedLadData]);
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
    this.dtTblService.emitDataChanged([...this.sortedLadData]);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred on lad updated';

    switch (errorRes.error) {
      case 'NOT_VALID_VALUE':
        errorMessage = 'Not valid value, the value must be greater or equal to 0 or smaller or equal to the reserved amount.';
        break;
      default:
        errorMessage = 'An unknown error occurred on lad updated';
        break;
    }
    this.woService.setWoError(errorMessage);

    return throwError(errorMessage);
  }

  ngOnDestroy() {
    this.woGetSub.unsubscribe();
    this.sortSub.unsubscribe();
    this.ladSub.unsubscribe();
    this.selectedChanged.unsubscribe();
  }
}
