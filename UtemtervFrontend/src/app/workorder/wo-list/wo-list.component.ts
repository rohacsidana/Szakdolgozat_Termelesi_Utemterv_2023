
import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { DataStorageService } from "src/app/shared/data-storage.service";
import * as  DataTableService from "../../data-table/data-table.service";
import { WoService } from "../wo.service";
@Component({
    selector: 'app-wo-list',
    templateUrl: 'wo-list.component.html',
    styleUrls: ['wo-list.component.css'],
    providers: [DataTableService.DataTableService]
})

export class WoListComponent implements OnInit, OnDestroy {
    woHeaders: { name: string, szoveg: string }[] = [
        { name: 'wo_lot', szoveg: 'Gyártási Rendelés szám' },
        { name: 'wo_nbr', szoveg: 'Rendelés szám' },
        { name: 'wo_user', szoveg: 'Aki felvette ezt a GYR-t' },
        { name: 'wo_part', szoveg: 'Tétel' },
        { name: 'wo_line', szoveg: 'Gyártósor' },
        { name: 'wo_seq', szoveg: 'sorszám' },
        { name: 'wo_qty_ord', szoveg: 'Rendelt mennyiség' },
        { name: 'wo_ord_date ', szoveg: 'Rendelési dátum' },
        { name: 'wo_due_date', szoveg: 'Határidő' },
        { name: 'wo_start_date', szoveg: 'Gyártás kezdetének dátuma' },
        { name: 'wo_rel_date', szoveg: 'Kibocsájtási dátum' },
        { name: 'wo_est_run', szoveg: 'Várható elkészülési idő' },
        { name: 'wo_start_time', szoveg: 'Kezdési idő' },
        { name: 'wo_end_time', szoveg: 'Végzési idő' },
        { name: 'wo_pld_downtime', szoveg: 'Tervezett átállásidő' },
        { name: 'wo_unpld_downtime', szoveg: 'Tervezetlen átállásidő' },
        { name: 'wo_activated', szoveg: 'Élesítve' },
        { name: 'wo_status', szoveg: 'státusz' },
    ];

    woData: DataTableService.Wo[] = [];

    woDataChangedSub: Subscription;
    sortSub: Subscription;

    woLot: number = 22;
    sortedWoData: DataTableService.Wo[] = [];
    getItemSub: Subscription;
    selectRow: Subscription;
    lastSort: Sort;
    constructor(private dtTblService: DataTableService.DataTableService, private woService: WoService, private router: Router, private route: ActivatedRoute, private DataStorageService: DataStorageService, private http: HttpClient) {
    }

    ngOnInit() {
        this.woDataChangedSub = this.woService.woDataChanged.subscribe(
            (woData: DataTableService.Wo[]) => {
                this.woData = woData;
                this.sortedWoData = this.woData.slice();
                if (!!this.lastSort) {
                    this.sortedWoData = this.woData.slice();
                    this.sortData(this.lastSort);
                } else {
                    this.sortedWoData = this.woData.slice();
                    this.dtTblService.dataChanged.next(this.sortedWoData.slice());
                }
            }
        );
        this.DataStorageService.fetchAllWo(); 


        this.sortSub = this.dtTblService.sortData.subscribe(
            (sort: Sort) => {
                this.lastSort = sort;
                this.sortData(sort);
            }
        );

        this.selectRow = this.dtTblService.selectRow.subscribe(
            (selectedRow: DataTableService.Wo) => {
                let pk = selectedRow.wo_lot
                this.router.navigate(['../', pk], { relativeTo: this.route });
            }
        );
        
    }

    onSubmit(form: NgForm) {

    }


    sortData(sort: Sort) {

        const data = this.woData.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedWoData = data;
            this.dtTblService.dataChanged.next(this.sortedWoData.slice());
            return;
        }

        this.sortedWoData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'wo_lot':
                    return this.compare(a.wo_lot, b.wo_lot, isAsc);
                case 'wo_nbr':
                    return this.compare(a.wo_nbr, b.wo_nbr, isAsc);
                case 'wo_user':
                    return this.compare(a.wo_user, b.wo_user, isAsc);
                case 'wo_part':
                    return this.compare(a.wo_part, b.wo_part, isAsc);
                case 'wo_line':
                    return this.compare(a.wo_line, b.wo_line, isAsc);
                case 'wo_seq':
                    return this.compare(a.wo_seq, b.wo_seq, isAsc);
                case 'wo_qty_ord':
                    return this.compare(a.wo_qty_ord, b.wo_qty_ord, isAsc);
                case 'wo_ord_date':
                    return this.compare(a.wo_ord_date, b.wo_ord_date, isAsc);
                case 'wo_due_date':
                    return this.compare(a.wo_due_date, b.wo_due_date, isAsc);
                case 'wo_start_date':
                    return this.compare(a.wo_start_date, b.wo_start_date, isAsc);
                case 'wo_rel_date':
                    return this.compare(a.wo_rel_date, b.wo_rel_date, isAsc);
                case 'wo_est_run':
                    return this.compare(a.wo_est_run, b.wo_est_run, isAsc);
                case 'wo_start_time':
                    return this.compare(a.wo_start_time, b.wo_start_time, isAsc);
                case 'wo_end_time':
                    return this.compare(a.wo_end_time, b.wo_end_time, isAsc);
                case 'wo_pld_downtime':
                    return this.compare(a.wo_pld_downtime, b.wo_pld_downtime, isAsc);
                case 'wo_unpld_downtime':
                    return this.compare(a.wo_unpld_downtime, b.wo_unpld_downtime, isAsc);
                case 'wo_status':
                    return this.compare(a.wo_status, b.wo_status, isAsc);
                default:
                    return 0;
            }
        });

        this.sortedWoData = data.slice();
        this.dtTblService.dataChanged.next(this.sortedWoData.slice());
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnDestroy() {
        this.sortSub.unsubscribe();
        this.woDataChangedSub.unsubscribe();
    }
    filterData(arg: number) {
        const data = this.sortedWoData.slice();
        let filter = arg.toString();
        const results = data.filter(value => value.wo_lot.toString().includes(filter));
        this.dtTblService.dataChanged.next(results.slice());
    }

}


