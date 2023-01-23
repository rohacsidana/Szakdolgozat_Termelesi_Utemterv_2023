import { Injectable } from "@angular/core";
import { Subject } from "rxjs-compat";
import * as DataTableService from "../data-table/data-table.service";
@Injectable({
    providedIn: 'root'
})
export class WoService{


    woData: DataTableService.Wo[] = [
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 11, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 2, wo_nbr: 'nbr2', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 12, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 3, wo_nbr: 'nbr3', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 13, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 4, wo_nbr: 'nbr4', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 14, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 5, wo_nbr: 'nbr5', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 15, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 6, wo_nbr: 'nbr6', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 16, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 7, wo_nbr: 'nbr7', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 17, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
                  ];
    woDataChanged = new Subject<any>();
    wodData: DataTableService.Wod[];
    ladData: DataTableService.Lad[];
    newModeChange = new Subject<boolean>();



    

    getWoData(){
        return this.woData.slice();
    }

    getWodData(){
        return this.wodData.slice();
    }
    getLadData(){
        return this.ladData.slice();
    }


    setWoData(){
        this.woData = [
            { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 11, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
            { wo_lot: 2, wo_nbr: 'nbr2', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 12, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
            { wo_lot: 3, wo_nbr: 'nbr3', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 13, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
            { wo_lot: 4, wo_nbr: 'nbr4', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 14, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
            { wo_lot: 5, wo_nbr: 'nbr5', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 15, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
            { wo_lot: 6, wo_nbr: 'nbr6', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 16, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
            { wo_lot: 7, wo_nbr: 'nbr7', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 17, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
                      ];
        this.woDataChanged.next();
    }
   
    getWo(woLot: number){
        
        if(this.woData != null){
            return this.woData.find( element => element.wo_lot === woLot);
            
        }

        /* return apihívás */
        
        
    }
}