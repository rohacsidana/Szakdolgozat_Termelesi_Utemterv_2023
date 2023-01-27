import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';

export interface Pt {
  pt_part: number;
  pt_desc: string;
  pt_um: string;
}
export interface XWo {
  wo_lot: number;
  wo_nbr: string;
  wo_part: number;
  pt_desc: string;
  wo_qty_ord: number;
  part_um: string;
  wo_line: string;
  ln_desc: string;
  item_per_hour: number;
  wo_est_run: string;
  wo_seq: number;
  wo_rel_date: string;
  wo_start_date: string;
  wo_start_time: string;
  wo_end_time: string;
  wo_pld_downtime: string;
  wo_unpld_downtime: string;
  wo_activated: boolean;
}

export interface User {
  user_id: number;
  name: string;
  birth_date: Date;
  email: string;
  post: string;
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
export interface Wo {
  wo_lot: number;
  wo_nbr: string;
  wo_user: number;
  wo_part: number;
  wo_line: string;
  wo_seq: number;
  wo_qty_ord: number;
  wo_ord_date: string;
  wo_due_date: string;
  wo_start_date: string;
  wo_rel_date: string;
  wo_est_run: string;
  wo_start_time: string;
  wo_end_time: string;
  wo_pld_downtime: string;
  wo_unpld_downtime: string;
  wo_activated: boolean;
  wo_status: string;
}
export interface Ps {
  ps_par: number;
  ps_comp: number;
  ps_qty_per: number;
}
export interface Lad {
  lad_id: number; //Foglalás azon
  lad_part: number; //Wod_part In
  lad_par: number; //Wod_par Int
  lad_lot: number; //Wod_lot Int
  lad_comp: number; //Ld_part Int
  lad_expire: number; //Ld_expire
  lad_qty_rsrv: number; //Foglalt
}
export interface Ld {
  ld_part: number;
  ld_expire: Date;
  ld_qty_oh: number;
  ld_qty_rsrv: number;
  ld_qty_scrp: number;
}

@Injectable()
export class DataTableService {
  dataChanged = new Subject<DataTables[]>();
  getData = new Subject<any>();
  selectRow = new Subject<DataTables>();
  sortData = new Subject<Sort>();


  emitDataChanged(data: DataTables[]) {
    this.dataChanged.next(data);
  }

  getDataEmit() {
    this.getData.next();
  }

  emitSelectedRow(data: DataTables) {
    this.selectRow.next(data);
  }
}

export type DataTables = Wod | User | Wo | Lad | Pt | Ps | Lad | Ld;
