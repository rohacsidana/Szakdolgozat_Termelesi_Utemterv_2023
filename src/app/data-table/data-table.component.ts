import { KeyValuePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { DataTables, DataTableService } from './data-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: 'data-table.component.html',
  styleUrls: ['data-table.component.css'],
})
export class DataTableComponent implements OnDestroy , OnInit{
  @Input() headers: { name: string; szoveg: string }[];
  @Output() sortEvent = new EventEmitter<Sort>();

  length: number;
  sortedMockData: DataTables[];
  viewData: DataTables[];

  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50];
  kezdIndex;
  vegIndex;

  dtSub: Subscription;

  constructor(private dataTblService: DataTableService) {}

  ngOnInit() {
    this.dtSub = this.dataTblService.sortedData.subscribe((data) => {
      this.sortedMockData = data.slice();
      this.length = this.sortedMockData.length;
      this.setView();
    });
    this.dataTblService.getDataEmit();
  }

  handleSortData(sort: Sort) {
    this.sortEvent.emit(sort);
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
    this.vegIndex = this.pageIndex === 0 ? this.pageSize : this.kezdIndex * 2;

    this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);
  }

  ngOnDestroy() {
    this.dtSub.unsubscribe();
  }

  valami(item: DataTables){
    this.dataTblService.emitSelectedRow(item);
  }


}
