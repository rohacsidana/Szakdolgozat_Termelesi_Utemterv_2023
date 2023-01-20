import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
@Injectable()
export class DataTableService {
  sortedData = new Subject<DataTables[]>();
  getData = new Subject<any>();
  sortedDataEmit(data: DataTables[]) {
    this.sortedData.next(data);
  }

  getDataEmit() {
    this.getData.next();
  }
}

export type DataTables = Wod | User;
