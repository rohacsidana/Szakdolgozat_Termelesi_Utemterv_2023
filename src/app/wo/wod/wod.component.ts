
import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { Subscription, take } from 'rxjs';
interface MockWod {
    wod_part: number;
    part_name: string;
    wod_par: number;
    par_name: string;
    wod_qty_req: number;
    part_um: string;
    gy_req: number;
    wod_qty_compl: number;
    wod_qty_rjct: number;
}

@Component({
    selector: 'app-wod',
    templateUrl: 'wod.component.html',
    styleUrls: ['wod.component.css']
})

export class WodComponent implements AfterViewInit {
    mockData: MockWod[] = [
        { wod_part: 1, part_name: 'teszt1', wod_par: 2, par_name: "teszt2", wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 2, part_name: 'teszt2', wod_par: 3, par_name: "teszt3", wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 3, part_name: 'teszt3', wod_par: null, par_name: null, wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 4, part_name: 'teszt4', wod_par: 5, par_name: "teszt5", wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 5, part_name: 'teszt5', wod_par: 6, par_name: "teszt6", wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 6, part_name: 'teszt6', wod_par: null, par_name: null, wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 7, part_name: 'teszt6', wod_par: null, par_name: null, wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 8, part_name: 'teszt6', wod_par: null, par_name: null, wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 9, part_name: 'teszt6', wod_par: null, par_name: null, wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 10, part_name: 'teszt6', wod_par: null, par_name: null, wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
        { wod_part: 11, part_name: 'teszt6', wod_par: null, par_name: null, wod_qty_req: 1, part_um: 'db', gy_req: 1, wod_qty_compl: 0, wod_qty_rjct: 0 },
    ];

    sortedMockData: MockWod[];
    viewData: MockWod[];

    length = this.mockData.length;
    pageSize = 5;
    pageIndex = 0;
    //previousPageIndex = 0;
    pageSizeOptions = [5, 10, 25, 50];
    kezdIndex;// = this.pageIndex * this.pageSize * this.previousPageIndex;
    vegIndex;// = this.pageIndex === 0 ? this.pageSize : this.pageIndex * this.pageSize;
    constructor() {
        this.sortedMockData = this.mockData.slice();
        this.kezdIndex = this.pageIndex * this.pageSize;
        this.vegIndex = this.pageIndex === 0 ? this.pageSize : this.kezdIndex*2;
        this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);

    }

    ngAfterViewInit() {
        //console.log();

    }

    sortData(sort: Sort) {


        const data = this.mockData.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedMockData = data;
            return;
        }

        this.sortedMockData = data.sort(
            (a, b) => {
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
            }
        );
        this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    handlePageEvent(e: PageEvent) {
        console.log(e);
        this.pageIndex = e.pageIndex;
        this.length = e.length;
        this.pageSize = e.pageSize;
        this.kezdIndex = this.pageIndex * this.pageSize;
        this.vegIndex = this.pageIndex === 0 ? this.pageSize : this.kezdIndex*2;
        console.log(this.kezdIndex);
        console.log(this.vegIndex);
        
        this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);
    }
}