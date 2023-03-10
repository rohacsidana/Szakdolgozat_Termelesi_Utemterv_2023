import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Route,
} from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as DataTableService from 'src/app/data-table/data-table.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Wod } from 'src/app/shared/interfaces';
import { WoService } from '../../wo.service';

@Component({
  selector: 'app-wod',
  templateUrl: 'wod.component.html',
  providers: [DataTableService.DataTableService],
})
export class WodComponent implements OnInit, OnDestroy {
  wodData: Wod[] = [];
  wodHeadersCompleted = [
    { name: 'wod_part', szoveg: 'Tétetel szám' },
    { name: 'part_name', szoveg: 'Tétetel név' },
    { name: 'wod_par', szoveg: 'Szülő tétel' },
    { name: 'par_name', szoveg: 'Szülő név' },
    { name: 'wod_qty_req', szoveg: 'Szükséges menny.' },
    { name: 'part_um', szoveg: 'Mértékegység' },
    { name: 'wod_qty_compl', szoveg: 'Kész egység', input: { type: 'number' } },
    {
      name: 'wod_qty_rjct',
      szoveg: 'Visszautasított egység',
      input: { type: 'number' },
    },
  ];

  wodHeadersNotCompl = [
    { name: 'wod_part', szoveg: 'Tétetel szám' },
    { name: 'part_name', szoveg: 'Tétetel név' },
    { name: 'wod_par', szoveg: 'Szülő tétel' },
    { name: 'par_name', szoveg: 'Szülő név' },
    { name: 'wod_qty_req', szoveg: 'Szükséges menny.' },
    { name: 'part_um', szoveg: 'Mértékegység' },
    { name: 'wod_qty_compl', szoveg: 'Kész egység' },
    { name: 'wod_qty_rjct', szoveg: 'Visszautasított egység' },
  ];
  wodHeaders = this.wodHeadersNotCompl;
  editing = false;
  editingChangedSub: Subscription;
  sortSub: Subscription;
  wodSub: Subscription;
  sortedWodData: Wod[];
  lastSort: Sort;
  lot: number;
  selectedChanged: Subscription;
  inputDataChanged: Subscription;
  constructor(
    private dtTblService: DataTableService.DataTableService,
    private woService: WoService,
    private route: ActivatedRoute,
    private DataStorageService: DataStorageService
  ) {}
  ngOnInit() {
    this.editingChangedSub = this.woService.editingChanged.subscribe((data) => {
      this.editing = data;
      this.headerCheck(this.woService.getSelectedWo());
    });
    this.selectedChanged = this.woService.selectedWoChanged.subscribe(
      (data) => {
        this.headerCheck(this.woService.getSelectedWo());
      }
    );
    this.headerCheck(this.woService.getSelectedWo());

    this.inputDataChanged = this.dtTblService.inputDataChanged.subscribe(
      (data) => {
        this.DataStorageService.updateWod(data)
          .pipe(
            tap({
              next: () => this.woService.updateWod(data),
              error: (error) => this.handleError(error),
            })
          )
          .subscribe();
      }
    );
    this.wodSub = this.woService.wodDataChanged.subscribe((data: Wod[]) => {
      this.wodData = data;
      if (!!this.lastSort) {
        this.sortedWodData = this.wodData.slice();
        this.sortData(this.lastSort);
      } else {
        this.sortedWodData = this.wodData.slice();
        this.dtTblService.emitDataChanged([...this.sortedWodData]);
      }
    });
    this.route.params.subscribe((params: Params) => {
      this.lot = +params['lot'];
      this.DataStorageService.fetchWod(this.lot)
        .pipe(
          tap({
            next: (data) => this.woService.setWodData([...data]),
            error: (error) => {
              if (this.woService.woError === null) {
                this.woService.setWodData([]);
              }
              return throwError(error.error);
            },
          })
        )
        .subscribe();
    });

    this.sortSub = this.dtTblService.sortData.subscribe((sort: Sort) => {
      this.lastSort = sort;
      this.sortData(sort);
    });
  }

  sortData(sort: Sort) {
    if (!!!this.lastSort) {
    }
    const data = this.wodData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedWodData = data;
      this.dtTblService.emitDataChanged([...this.sortedWodData]);
      return;
    }

    this.sortedWodData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'wod_part':
          return this.compare(a.wod_part, b.wod_part, isAsc);
        case 'part_name':
          return this.compare(a.part_name, b.part_name, isAsc);
        case 'wod_par':
          return this.compare(a.wod_par, b.wod_par, isAsc);
        case 'par_name':
          return this.compare(a.par_name, b.par_name, isAsc);
        case 'wod_qty_req':
          return this.compare(a.wod_qty_req, b.wod_qty_req, isAsc);
        case 'part_um':
          return this.compare(a.part_um, b.part_um, isAsc);
        case 'wod_qty_compl':
          return this.compare(a.wod_qty_compl, b.wod_qty_compl, isAsc);
        case 'wod_qty_rjct':
          return this.compare(a.wod_qty_rjct, b.wod_qty_rjct, isAsc);
        default:
          return 0;
      }
    });

    this.sortedWodData = data.slice();
    this.dtTblService.emitDataChanged([...this.sortedWodData]);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  handleError(errorRes: HttpErrorResponse) {
    //let errorMessage = 'An unknown error occurred on wod updated';
    let errorMessage =
      'Ismeretlen hiba történt a gyártási részletek frissítése közben.';

    switch (errorRes.error) {
      case 'UNKNOWN_ERROR':
        //errorMessage = 'An unknown error occurred on wod updated';
        errorMessage =
          'Ismeretlen hiba történt a gyártási részletek frissítése közben.';
      default:
        //errorMessage = 'An unknown error occurred on wod updated';
        errorMessage =
          'Ismeretlen hiba történt a gyártási részletek frissítése közben.';
        break;
    }
    this.woService.setWoError(errorMessage);
    return throwError(errorMessage);
  }

  headerCheck(status) {
    if (status != null) {
      if (status.wo_status === 'completed' && this.editing) {
        this.wodHeaders = this.wodHeadersCompleted;
      } else {
        this.wodHeaders = this.wodHeadersNotCompl;
      }
    } else {
      this.wodHeaders = this.wodHeadersNotCompl;
    }
  }

  ngOnDestroy() {
    this.sortSub.unsubscribe();
    this.wodSub.unsubscribe();
    this.selectedChanged.unsubscribe();
    this.editingChangedSub.unsubscribe();
  }
}
