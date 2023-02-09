import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Route } from "@angular/router";
import { Subscription } from "rxjs";
import * as DataTableService from "src/app/data-table/data-table.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Wod } from "src/app/shared/interfaces";
import { WoService } from "../../wo.service";

@Component({
  selector: 'app-wod',
  templateUrl: 'wod.component.html',
  styleUrls: ['wod.component.css'],
  providers: [DataTableService.DataTableService]
})

export class WodComponent implements OnInit, OnDestroy {
  wodData: Wod[] = [];

  wodHeaders = [
    { name: 'wod_part', szoveg: 'Tétetel szám' },
    { name: 'part_name', szoveg: 'Tétetel név' },
    { name: 'wod_par', szoveg: 'Szülő tétel' },
    { name: 'par_name', szoveg: 'Szülő név' },
    { name: 'wod_qty_req', szoveg: 'Szükséges menny. szül.' },
    { name: 'part_um', szoveg: 'Szükséges menny. gyrt.' },
    { name: 'gy_req', szoveg: 'Mértékegység' },
    { name: 'wod_qty_compl', szoveg: 'Kész egység' },
    { name: 'wod_qty_rjct', szoveg: 'Visszautasított egység' },
  ];

  sortSub: Subscription;
  wodSub: Subscription;
  sortedWodData: Wod[];
  lastSort: Sort;
  lot: number;
  constructor(private dtTblService: DataTableService.DataTableService, private woService: WoService, private route: ActivatedRoute, private DataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.wodSub = this.woService.wodDataChanged.subscribe(
      (data: Wod[]) => {
        this.wodData = data;
        if(!!this.lastSort){
          this.sortedWodData = this.wodData.slice();
          this.sortData(this.lastSort);
        }else{
          this.sortedWodData = this.wodData.slice();
          this.dtTblService.dataChanged.next(this.sortedWodData.slice());
        }
      }
    );
    this.route.params.subscribe(
      (params: Params)=>{
        this.lot = +params["lot"];
        this.DataStorageService.fetchWod(this.lot);
      }
    );

    this.sortSub = this.dtTblService.sortData.subscribe(
      (sort: Sort) => {
        this.lastSort = sort;
        this.sortData(sort);
      }
    );

  }

  onSubmit(form: NgForm) {

  }


  sortData(sort: Sort) {
    if(!!!this.lastSort){

    }
    const data = this.wodData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedWodData = data;
      this.dtTblService.dataChanged.next(this.sortedWodData.slice());
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
        case 'gy_req':
          return this.compare(a.gy_req, b.gy_req, isAsc);
        case 'wod_qty_compl':
          return this.compare(a.wod_qty_compl, b.wod_qty_compl, isAsc);
        case 'wod_qty_rjct':
          return this.compare(a.wod_qty_rjct, b.wod_qty_rjct, isAsc);
        default:
          return 0;
      }
    });

    this.sortedWodData = data.slice();
    this.dtTblService.dataChanged.next(this.sortedWodData.slice());
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngOnDestroy() {

    this.sortSub.unsubscribe();
    this.wodSub.unsubscribe();
  }

}
