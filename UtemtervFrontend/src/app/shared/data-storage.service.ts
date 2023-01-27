import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { map, tap, take } from 'rxjs/operators';
import { Wo } from '../data-table/data-table.service';
import { WoService } from '../workorder/wo.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private woService: WoService) { }

    fetchAllWo() {
        this.http.get<WoResponse[]>("https://localhost:7075/workorder/list")
            .pipe(
                map(
                    (woData) => {

                        const woDataNew = woData.map(
                            (data) => {
                                const sor = { wo_lot: data.woLot, wo_nbr: data.woNbr, wo_part: data.woPart, wo_qty_ord: data.woQtyOrd, wo_ord_date: data.woOrdDate, wo_seq: data.woSeq, wo_due_date: data.woDueDate, wo_line: data.woLine, wo_est_run: data.woEstRun, wo_start_date: data.woStartDate, wo_start_time: data.woStartTime, wo_end_time: data.woEndTime, wo_pld_downtime: data.woPldDowntime, wo_unpld_downtime: data.woUnpldDowntime, wo_activated: data.woActivated, wo_status: data.woStatus, wo_rel_date: data.woRelDate, wo_user: data.woUser };
                                console.log(sor);

                                return { ...sor };
                            })
                        console.log(woData);
                        console.log(woDataNew);

                        return woDataNew;
                    }
                ),
                tap(
                    {
                        next: (data) => {
                            console.log(typeof data);
                            console.log(data);
                            this.woService.setWoData(data.slice());
                        },
                        error: (error) => console.log(error)
                    }

                )
            )
            .subscribe();

    }
   
    fetchWo(id: number) {
        /* let api = "workorder/" + id; */
        return this.http.get<WoResponse>("https://localhost:7075/workorder/" + id)
        .pipe(
            map(
                (wo)=>{
                    const woDataNew  = { wo_lot: wo.woLot, wo_nbr: wo.woNbr, wo_part: wo.woPart, wo_qty_ord: wo.woQtyOrd, wo_ord_date: wo.woOrdDate, wo_seq: wo.woSeq, wo_due_date: wo.woDueDate, wo_line: wo.woLine, wo_est_run: wo.woEstRun, wo_start_date: wo.woStartDate, wo_start_time: wo.woStartTime, wo_end_time: wo.woEndTime, wo_pld_downtime: wo.woPldDowntime, wo_unpld_downtime: wo.woUnpldDowntime, wo_activated: wo.woActivated, wo_status: wo.woStatus, wo_rel_date: wo.woRelDate, wo_user: wo.woUser };
                            return {...woDataNew};
                }
            )
        )
     }

    fetchLad(id: number) { }

    fetchWod(id: number) { }

    postWo(wo: Wo) { }
    updateWo(wo: Wo) { }
    deleteWo(id: number) { }

}

export const URL = "https://localhost:7075";
interface WoResponse {
    woLot: number;
    woNbr: string;
    woPart: number;
    woQtyOrd: number;
    woOrdDate: string;
    woSeq: number;
    woDueDate: string;
    woLine: string;
    woEstRun: string;
    woStartDate: string;
    woStartTime: string;
    woEndTime: string;
    woPldDowntime: string;
    woUnpldDowntime: string;
    woActivated: boolean;
    woStatus: string;
    woRelDate: string;
    woUser: number;

}