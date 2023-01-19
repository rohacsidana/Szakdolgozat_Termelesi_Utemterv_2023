/* import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Subject } from "rxjs";


@Injectable()
export class DataTableService {


    sortTableEvent = new Subject<Sort>();
    sortedData = new Subject<DataTables[]>();
    
    sortTable(sort: Sort){
        this.sortTableEvent.next(sort);
    }

    emitSortedData(data: DataTables[]){
        this.sortedData.next(data);
    }

}


 */