
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Sort } from "@angular/material/sort";
import { Subscription } from "rxjs-compat";
import { DataTables } from "../data-table/data-table.component";
@Component({
    selector: 'app-wo',
    templateUrl: 'wo.component.html',
    styleUrls: ['wo.component.css']
})


export class WoComponent implements OnInit {
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
        {name: 'a1', szoveg: 'b1'},
        {name: 'a2', szoveg: 'b2'},
        {name: 'a3', szoveg: 'b3'},
        {name: 'a4', szoveg: 'b4'},
        {name: 'a5', szoveg: 'b5'},
        {name: 'a6', szoveg: 'b6'},
        {name: 'a7', szoveg: 'b7'},
        {name: 'a8', szoveg: 'b8'},
        {name: 'a9', szoveg: 'b9'},
    ];
    
    sortedWodData: DataTables[];

    constructor() {
        this.sortedWodData = this.wodData.slice();
    }

    ngOnInit() {
        
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
        //this.viewData = this.sortedMockData.slice(this.kezdIndex, this.vegIndex);
       
    }
    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}