import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Wod } from "../wo/wo.component";

@Injectable()
export class DataTableService{

    sortedData = new Subject<DataTables[]>();
    getData = new Subject<any>();
    sortedDataEmit(data: DataTables[]){
        this.sortedData.next(data);
    }

    getDataEmit(){
        this.getData.next();
    }
}


export type DataTables =
    | Wod
    ;