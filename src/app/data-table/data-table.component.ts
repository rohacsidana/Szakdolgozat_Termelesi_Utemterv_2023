
import { Component, EventEmitter, Input, Output, AfterViewInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { Subscription } from "rxjs";
//import { DataTableService, DataTables } from "./data-table.service"; 
import { Wod } from '../wo/wod/wod.component';

@Component({
    selector: 'app-data-table',
    templateUrl: 'data-table.component.html',
    styleUrls: ['data-table.component.css'],
})

export class DataTableComponent implements AfterViewInit {
    //mockData: DataTables[];
    @Input() headers: { name: string, szoveg: string }[];
    @Output() sortEvent = new EventEmitter<Sort>();

    length: number;
    @Input() sortedMockData: DataTables[];
    viewData: DataTables[];

    pageSize = 5;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 25, 50];
    kezdIndex;
    vegIndex;

    dtSub: Subscription;

    ngAfterViewInit(): void {
       
        //this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);

    }

    ngOnInit() {
        this.kezdIndex = this.pageIndex * this.pageSize;
        this.vegIndex = this.pageIndex === 0 ? this.pageSize : this.kezdIndex * 2;
        this.length = this.sortedMockData.length;
        this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);
        console.log(this.sortedMockData);
        console.log(this.viewData);
        
    }

    handleSortData(sort: Sort) {
        //this.dataTableService.sortTable(sort);
        this.sortEvent.emit(sort);
    };

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    handlePageEvent(e: PageEvent) {
        this.pageIndex = e.pageIndex;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.kezdIndex = this.pageIndex * this.pageSize;
        this.vegIndex = this.pageIndex === 0 ? this.pageSize : this.kezdIndex * 2;
        this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);

    }
}

export type DataTables =
    | Wod
    ;
