import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subscription, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataTableService } from '../data-table/data-table.service';
import { DataStorageService } from '../shared/data-storage.service';
import { XWo } from '../shared/interfaces';
import { WoService } from '../workorder/wo.service';

@Component({
  selector: 'app-xwo',
  templateUrl: 'xwo.component.html',
  styleUrls: ['xwo.component.css'],
  providers: [DataTableService],
})
export class XWoCoponent implements OnInit, OnDestroy {
  xwoData: XWo[] = [];
  sortedWodData: XWo[] = [];
  error: string = null;
  lastSort: Sort = null;
  editing: boolean = false;
  xwoNotEditingHeader = [
    { name: 'wo_lot', szoveg: 'GYR azon' },
    { name: 'wo_nbr', szoveg: 'GYR szám' },
    { name: 'wo_part', szoveg: 'GYR tételkód' },
    { name: 'pt_desc', szoveg: 'Megnevezés' },
    { name: 'wo_qty_ord', szoveg: 'Mennyiség' },
    { name: 'part_um', szoveg: 'Mértékegység' },
    { name: 'wo_line', szoveg: 'Gyártósor' },
    { name: 'ln_desc', szoveg: 'Gyártósor megnevezés' },
    { name: 'item_per_hour', szoveg: 'Óránkénti elkészülési egység' },
    { name: 'wo_est_run', szoveg: 'Várható elkészülési idő' },
    { name: 'wo_seq', szoveg: 'sorrend' },
    { name: 'wo_rel_date', szoveg: 'Kibocsátási dátum' },
    { name: 'wo_start_date', szoveg: 'Gyártás Esedékességi dátum' },
    { name: 'wo_start_time', szoveg: 'Kezdési idő' },
    { name: 'wo_end_time', szoveg: 'Végzési idő' },
    { name: 'wo_pld_downtime', szoveg: 'Tervezett állási idő' },
    { name: 'wo_unpld_downtime', szoveg: 'Nem tervezett állási idő' },
  ];
  xwoEditingHeader = [
    { name: 'wo_lot', szoveg: 'GYR azon' },
    { name: 'wo_nbr', szoveg: 'GYR szám' },
    { name: 'wo_part', szoveg: 'GYR tételkód' },
    { name: 'pt_desc', szoveg: 'Megnevezés' },
    { name: 'wo_qty_ord', szoveg: 'Mennyiség' },
    { name: 'part_um', szoveg: 'Mértékegység' },
    { name: 'wo_line', szoveg: 'Gyártósor' },
    { name: 'ln_desc', szoveg: 'Gyártósor megnevezés' },
    { name: 'item_per_hour', szoveg: 'Óránkénti elkészülési egység' },
    { name: 'wo_est_run', szoveg: 'Várható elkészülési idő' },
    { name: 'wo_seq', szoveg: 'sorrend', input: { type: 'number', step: 10 } },
    { name: 'wo_rel_date', szoveg: 'Kibocsátási dátum' },
    { name: 'wo_start_date', szoveg: 'Gyártás Esedékességi dátum' },
    { name: 'wo_start_time', szoveg: 'Kezdési idő' },
    { name: 'wo_end_time', szoveg: 'Végzési idő' },
    { name: 'wo_pld_downtime', szoveg: 'Tervezett állási idő' },
    { name: 'wo_unpld_downtime', szoveg: 'Nem tervezett állási idő' },
  ];

  xwoHeaders: {
    name: string;
    szoveg: string;
    input?: {
      type: string;
      step?: number;
    };
  }[] = this.xwoNotEditingHeader;

  xwoDataChangedSub: Subscription;
  dtTableInputSub: Subscription;
  utemezheto: boolean = false;
  constructor(
    private datatableservice: DataTableService,
    private dataStorageService: DataStorageService,
    private woService: WoService
  ) {}

  ngOnInit() {
    this.xwoDataChangedSub = this.woService.xwoDataChanged.subscribe((data) => {
      this.xwoData = [
        ...data.map((xwo) => {
          return { ...xwo };
        }),
      ];
      this.sortedWodData = [
        ...this.xwoData.map((xwo) => {
          return { ...xwo };
        }),
      ];

      this.datatableservice.emitDataChanged([
        ...this.sortedWodData.map((xwo) => {
          return { ...xwo };
        }),
      ]);
      this.utemezheto = this.woService.isUtemezheto();
    });
    this.dtTableInputSub = this.datatableservice.inputDataChanged.subscribe(
      (data: XWo) => {
        this.dataStorageService
          .updateWoSeq(data.wo_lot, data.wo_seq)
          .pipe(
            tap({
              next: () => this.woService.setXWo({ ...data }),
              error: (error) => {
                this.handleError(error);
              },
            })
          )
          .subscribe();
      }
    );
  }

  onHandleError() {
    this.error = null;
    this.woService.woError = null;

    this.datatableservice.emitDataChanged([
      ...this.sortedWodData.map((xwo) => {
        return { ...xwo };
      }),
    ]);
  }

  handleError(errorRes: HttpErrorResponse) {
    //let errorMessage = 'An unknown error occurred!';
    let errorMessage = 'Ismeretlen hiba történt.';

    switch (errorRes.error) {
      case 'SEQ_ERROR':
        //errorMessage = 'There are more then one workorder with the same seq';
        errorMessage = 'Több mint egy gyártási rendelés van azonos sorrenddel.';
        break;

      case 'UNKNOWN_ERROR':
        //errorMessage = 'An unknown error occurred';
        errorMessage = 'Ismeretlen hiba történt.';

      default:
        //errorMessage = 'An unknown error occurred';
        errorMessage = 'Ismeretlen hiba történt.';
        break;
    }

    this.error = errorMessage;
    this.woService.woError = this.error;
    return throwError(errorMessage);
  }

  search(line, week, year: string) {
    this.editing = false;
    this.xwoHeaders = this.xwoNotEditingHeader;
    this.dataStorageService
      .fetchUtemterv(week, line, year)
      .pipe(
        tap({
          next: (data) => this.woService.setXWos(data),
          error: (error) => this.handleError(error),
        })
      )
      .subscribe();
  }

  cancel() {
    this.editing = !this.editing;
    this.xwoHeaders = this.editing
      ? this.xwoEditingHeader
      : this.xwoNotEditingHeader;
  }

  utemez(line, week, start_time, year) {
    this.dataStorageService
      .utemez(week, line, '' + start_time, year)
      .pipe(
        tap({
          next: (res) => {
            this.woService.setXWos(res);
            this.editing = false;
            this.xwoHeaders = this.xwoNotEditingHeader;
          },
          error: (error) => this.handleError(error),
        })
      )
      .subscribe();
  }

  onActivateWeek(week: number, line: string, year: string){
    console.log("CIGÁNYOK");
    this.dataStorageService.activateWorkWeek(week, line, year)
    .pipe(
      tap({
        next: (data)=>{
          
          console.log(data);
          
        },
        error: (error)=>this.handleError(error)
      })
    )
  }
  canActivateWeek(){
    if(this.xwoData !== null){
      let index = 0;
      while(index < this.xwoData.length && !(this.xwoData[0].wo_end_time === null)){
        index++;
      }
      return index >= this.xwoData.length

    }
    return false;
  }
  ngOnDestroy(): void {
    this.xwoDataChangedSub.unsubscribe();
  }
}
