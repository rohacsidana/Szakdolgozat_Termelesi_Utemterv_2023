import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { DataTables } from '../shared/interfaces';



@Injectable()
export class DataTableService {
  dataChanged = new Subject<DataTables[]>();
  getData = new Subject<any>();
  selectRow = new Subject<DataTables>();
  sortData = new Subject<Sort>();
  getchangedData = new Subject<any>();
  changedData = new Subject<DataTables[]>();
  
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


