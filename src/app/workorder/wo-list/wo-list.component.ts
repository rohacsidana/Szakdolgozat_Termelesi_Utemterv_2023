
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import { Subscription } from "rxjs";
import * as  DataTableService from "../../data-table/data-table.service";

@Component({
    selector: 'app-wo-list',
    templateUrl: 'wo-list.component.html',
    styleUrls: ['wo-list.component.css'],
    providers: [DataTableService.DataTableService]
})

export class WoListComponent {
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
    ]

    woData: DataTableService.Wo[] = [
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 11, wo_qty_ord: 10, wo_ord_date: '20201222', wo_due_date: '20201222', wo_start_date: '20201222', wo_rel_date: '20201222', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 12, wo_qty_ord: 10, wo_ord_date: '20201222', wo_due_date: '20201222', wo_start_date: '20201222', wo_rel_date: '20201222', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 13, wo_qty_ord: 10, wo_ord_date: '20201222', wo_due_date: '20201222', wo_start_date: '20201222', wo_rel_date: '20201222', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 14, wo_qty_ord: 10, wo_ord_date: '20201222', wo_due_date: '20201222', wo_start_date: '20201222', wo_rel_date: '20201222', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 15, wo_qty_ord: 10, wo_ord_date: '20201222', wo_due_date: '20201222', wo_start_date: '20201222', wo_rel_date: '20201222', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 16, wo_qty_ord: 10, wo_ord_date: '20201222', wo_due_date: '20201222', wo_start_date: '20201222', wo_rel_date: '20201222', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 17, wo_qty_ord: 10, wo_ord_date: '20201222', wo_due_date: '20201222', wo_start_date: '20201222', wo_rel_date: '20201222', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
    ]
    sortSub: Subscription;
    woLot: number = 22;
    sortedWoData: DataTableService.Wo[];

    getItemSub: Subscription;
    constructor(private dtTblService: DataTableService.DataTableService) {
        this.sortedWoData = this.woData.slice();
       

    }

    ngOnInit() {
        this.getItemSub = this.dtTblService.getData.subscribe(() => {
            this.dtTblService.emitDataChanged(this.sortedWoData.slice());
        });
        this.dtTblService.emitDataChanged(this.sortedWoData.slice());
        this.sortSub = this.dtTblService.sortData.subscribe(
            (sort: Sort)=>{
                this.sortData(sort);
            }
        );
    }

    onSubmit(form: NgForm) {
        
    }


    sortData(sort: Sort) {

        const data = this.woData.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedWoData = data;
            this.dtTblService.emitDataChanged(this.sortedWoData.slice());
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
        this.dtTblService.emitDataChanged(this.sortedWoData.slice());
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnDestroy() {
        this.getItemSub.unsubscribe();
        this.sortSub.unsubscribe();
    }
    filterData(arg: number) {
        const data = this.sortedWoData.slice();
        let filter = arg.toString();
        const results = data.filter( value => value.wo_lot.toString().includes(filter));
        this.dtTblService.emitDataChanged(results.slice());
    }

}


