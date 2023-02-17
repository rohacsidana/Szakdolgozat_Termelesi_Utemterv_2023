import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { DataTables } from '../shared/interfaces';

@Injectable()
export class DataTableService {
  data: DataTables[] = [];
  dataChanged = new Subject<DataTables[]>();
  getData = new Subject<any>();
  selectRow = new Subject<DataTables>();
  inputDataChanged = new Subject<DataTables>();
  sortData = new Subject<Sort>();

  getChangedData(): DataTables[]{
    return this.data.slice();
  }
  emitDataChanged(data: DataTables[]) {
    this.data = data.slice();
    this.dataChanged.next(this.data);
  }

  emitSelectedRow(data: DataTables) {
    this.selectRow.next(data);
  }
}
