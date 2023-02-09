import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { DataTables } from '../shared/interfaces';
import { DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: 'data-table.component.html',
  styleUrls: ['data-table.component.css'],
})
export class DataTableComponent implements OnDestroy, OnInit {
  @Input() headers: { name: string; szoveg: string }[];

  length: number;
  data: DataTables[] = [];
  viewData: DataTables[]  = [];

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  kezdIndex;
  vegIndex;

  dateType: boolean = false;

  dtSub: Subscription;

  constructor(private dataTblService: DataTableService) {
    this.dtSub = this.dataTblService.dataChanged.subscribe((data) => {

      this.data = data.slice();

      this.length = this.data.length;
      this.setView();
    });
  }

  ngOnInit() {
    /* this.dtSub = this.dataTblService.dataChanged.subscribe((data) => {
      this.data = data.slice();
      this.length = this.data.length;
      this.setView();
    }); */

    //this.dataTblService.getDataEmit();
  }


  isDate(data) {
    if (data instanceof Date) {
      return true;
    } else {
      return false;
    }
  }

  handleSortData(sort: Sort) {
    //this.sortEvent.emit(sort);
    this.dataTblService.sortData.next(sort);
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.setView();
  }
  natural = new Intl.Collator('en').compare;

  setView() {


    this.kezdIndex = this.pageIndex * this.pageSize;
    this.vegIndex = this.pageIndex === 0 ? this.pageSize : this.kezdIndex + this.pageSize;


    this.viewData = this.data.slice(this.kezdIndex, this.vegIndex);
  }

  ngOnDestroy() {
    this.dtSub.unsubscribe();
  }

  selectRow(item: DataTables) {
    this.dataTblService.emitSelectedRow(item);
  }
}
