
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import { Subscription } from "rxjs-compat";
import { DataTables, DataTableService } from "../data-table/data-table.service";
@Component({
    selector: 'app-wo',
    templateUrl: 'wo.component.html',
    styleUrls: ['wo.component.css']
})


export class WoComponent implements OnInit, OnDestroy {
    isSearchingMode: boolean = true;
    dtsSub: Subscription;
    wodData: DataTables[] = [
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

    wodHeaders = [
        {name: 'wod_part', szoveg: 'Tétetel szám'},
        {name: 'part_name', szoveg: 'Tétetel név'},
        {name: 'wod_par', szoveg: 'Szülő tétel'},
        {name: 'par_name', szoveg: 'Szülő név'},
        {name: 'wod_qty_req', szoveg: 'Szükséges menny. szül.'},
        {name: 'part_um', szoveg: 'Szükséges menny. gyrt.'},
        {name: 'gy_req', szoveg: 'Mértékegység'},
        {name: 'wod_qty_compl', szoveg: 'Kész egység'},
        {name: 'wod_qty_rjct', szoveg: 'Visszautasított egység'},
    ];
    
    sortedWodData: DataTables[];
    getItemSub: Subscription;
    constructor(private dtTblService: DataTableService) {
        this.sortedWodData = this.wodData.slice();
    }

    ngOnInit() {
        this.getItemSub = this.dtTblService.getData.subscribe(
            ()=>{
                this.dtTblService.sortedDataEmit(this.sortedWodData.slice());
            }
        );
    }

    onSubmit(form: NgForm) {
        console.log(form);
        console.log(form.value);
    }

    changeMode() {
        this.isSearchingMode = !this.isSearchingMode;
    }

    

    sortData(sort: Sort) {
        

        const data = this.wodData.slice();
        if (!sort.active || sort.direction === '') {
            this.sortedWodData = data;
            this.dtTblService.sortedDataEmit(this.sortedWodData.slice());
            return;
        }

        this.sortedWodData = data.sort(
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
        
        this.sortedWodData = data.slice();
        this.dtTblService.sortedDataEmit(this.sortedWodData.slice());
        
       
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnDestroy(): void {
        this.dtsSub.unsubscribe();
    }
}
export interface Wod {
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