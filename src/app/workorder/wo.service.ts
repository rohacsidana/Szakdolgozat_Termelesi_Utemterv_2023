import { Injectable } from "@angular/core";
import * as DataTableService from "../data-table/data-table.service";
@Injectable({
    providedIn: 'root'
})
export class WoService{

    woData: DataTableService.Wo[];
    selectedWo: DataTableService.Wo;
    wodData: DataTableService.Wod[];
    ladData: DataTableService.Lad[];

    getWoData(){
        return this.woData.slice();
    }

    getWodData(){
        return this.wodData.slice();
    }
    getLadData(){
        return this.ladData.slice();
    }

    getWo(selectedWo: DataTableService.Wo){
        return this.selectedWo;
    }


   

    
}