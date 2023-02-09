import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as DataTableService from "../data-table/data-table.service";
@Injectable({
    providedIn: 'root'
})
export class WoService {
    constructor() { }
    /*lad és wod értékei*/
    woData: DataTableService.Wo[] = [];
    /* [
        { wo_lot: 1, wo_nbr: 'nbr1', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 11, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 2, wo_nbr: 'nbr2', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 12, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 3, wo_nbr: 'nbr3', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 13, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 4, wo_nbr: 'nbr4', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 14, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
        { wo_lot: 5, wo_nbr: 'nbr5', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 15, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 6, wo_nbr: 'nbr6', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 16, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: true, wo_status: 'asd' },
        { wo_lot: 7, wo_nbr: 'nbr7', wo_user: 1, wo_part: 2, wo_line: 'line1', wo_seq: 17, wo_qty_ord: 10, wo_ord_date: '2020-12-22', wo_due_date: '2020-12-22', wo_start_date: '2020-12-22', wo_rel_date: '2020-12-22', wo_est_run: '01:11', wo_start_time: '01:11', wo_end_time: '01:11', wo_pld_downtime: '01:11', wo_unpld_downtime: '01:11', wo_activated: false, wo_status: 'asd' },
    ]; */
    woDataChanged = new Subject<DataTableService.Wo[]>();
    wodData: DataTableService.Wod[] = [
        {
            wod_part: 1,
            part_name: 'teszt1',
            wod_par: 2,
            par_name: 'teszt2',
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 2,
            part_name: 'teszt2',
            wod_par: 3,
            par_name: 'teszt3',
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 3,
            part_name: 'teszt3',
            wod_par: null,
            par_name: null,
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 4,
            part_name: 'teszt4',
            wod_par: 5,
            par_name: 'teszt5',
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 5,
            part_name: 'teszt5',
            wod_par: 6,
            par_name: 'teszt6',
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 6,
            part_name: 'teszt6',
            wod_par: null,
            par_name: null,
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 7,
            part_name: 'teszt6',
            wod_par: null,
            par_name: null,
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 8,
            part_name: 'teszt6',
            wod_par: null,
            par_name: null,
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 9,
            part_name: 'teszt6',
            wod_par: null,
            par_name: null,
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 10,
            part_name: 'teszt6',
            wod_par: null,
            par_name: null,
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
        {
            wod_part: 11,
            part_name: 'teszt6',
            wod_par: null,
            par_name: null,
            wod_qty_req: 1,
            part_um: 'db',
            gy_req: 1,
            wod_qty_compl: 0,
            wod_qty_rjct: 0,
        },
    ];
    wodDataChanged = new Subject<DataTableService.Wod[]>();
    ladData: DataTableService.Lad[] = [
        { lad_id: 0, lad_part: 1, lad_par: 2, lad_lot: 10, lad_comp: 2112300, lad_expire: 22, lad_qty_rsrv: 21 },
        { lad_id: 1, lad_part: 14, lad_par: 12, lad_lot: 10, lad_comp: 21002, lad_expire: 20, lad_qty_rsrv: 10 },
        { lad_id: 2, lad_part: 1, lad_par: 2, lad_lot: 10, lad_comp: 21020, lad_expire: 1321, lad_qty_rsrv: 13 },
        { lad_id: 3, lad_part: 11, lad_par: 25, lad_lot: 10, lad_comp: 21020, lad_expire: 22, lad_qty_rsrv: 14 },
        { lad_id: 0, lad_part: 11, lad_par: 21, lad_lot: 10, lad_comp: 210220, lad_expire: 22, lad_qty_rsrv: 1 },
        { lad_id: 9, lad_part: 1231, lad_par: 223, lad_lot: 10, lad_comp: 21200, lad_expire: 22, lad_qty_rsrv: 311 },
    ];
    ladDataChanged = new Subject<DataTableService.Lad[]>();
    selectedWo: DataTableService.Wo = null;

    setSelectedWo(wo: DataTableService.Wo) {
        this.selectedWo = wo;
    }
    getSelectedWo() {
        return this.selectedWo;
    }
    getWos() {
        return this.woData.slice();
    }

    getWods() {
        return this.wodData.slice();
    }
    getLads() {
        return this.ladData.slice();
    }


    setWoData(woData: DataTableService.Wo[]) {
        this.woData = woData.slice();
        this.woDataChanged.next(this.woData.slice());
    }

    setLadData(ladData: DataTableService.Lad[]) {
        this.ladData = ladData.slice();
        this.ladDataChanged.next(this.ladData.slice());
    }

    setWodData(wodData: DataTableService.Wod[]) {
        this.wodData = wodData.slice();
        this.wodDataChanged.next(this.wodData.slice());
    }

    getWo(woLot: number) {

        if (this.woData.length !== 0) {

            return this.woData.find(element => element.wo_lot === woLot);
        } else {
            return null;
        }
        /*  else {
             return this.DataStorageService.fetchWo(woLot);
         } */
        /* return apihívás */


    }
}