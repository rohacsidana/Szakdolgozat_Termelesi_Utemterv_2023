import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { Wo } from '../data-table/data-table.service';
import { WoService } from '../workorder/wo.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{

    constructor(private http: HttpClient, private woService: WoService ){}

    fetchAllWo(){
    }
    fetchWo(id: number){}
    fetchLad(id: number){}
    fetchWod(id: number){}
    
    postWo(wo: Wo){}
    updateWo(wo: Wo){}
    deleteWo(id: number){}

}