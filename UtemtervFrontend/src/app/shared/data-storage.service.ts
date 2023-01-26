import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { map, tap } from 'rxjs/operators';
import { Wo } from '../data-table/data-table.service';
import { WoService } from '../workorder/wo.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor(private http: HttpClient, private woService: WoService ){}

    fetchAllWo(){
        let uri = "/workorder/list";
        return this.http
            .get<Wo[]>(URL+uri)
            .pipe(
                map(
                    woData =>{
                        return woData.map(
                            wo =>{
                                return {...wo};
                            }
                        ); 
                    }
                ),
                tap(
                    (data)=>{
                        this.woService.setWoData(data);
                    }
                )
            ) 
            
            
    }
    fetchWo(id: number){}
    fetchLad(id: number){}
    fetchWod(id: number){}
    
    postWo(wo: Wo){}
    updateWo(wo: Wo){}
    deleteWo(id: number){}

}

    export const URL = "https://localhost:7075";
