import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { Subscription, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import { DataTableService } from "../data-table/data-table.service";
import { DataStorageService } from "../shared/data-storage.service";
import { XWo } from "../shared/interfaces";
import { WoService } from "../workorder/wo.service";

@Component({
    selector: 'app-xwo',
    templateUrl: 'xwo.component.html',
    styleUrls: ['xwo.component.css'],
    providers: [DataTableService]
})

export class XWoCoponent implements OnInit, OnDestroy {
    xwoData: XWo[] = [];
    sortedWodData: XWo[] = [];
    error: string = null;
    lastSort: Sort = null;
    xwoHeaders: {
        name: string, szoveg: string, input?: {
            type: string;
            step?: number;
        }
    }[] = [
            { name: "wo_lot", szoveg: "GYR azon" },
            { name: "wo_nbr", szoveg: "GYR szám" },
            { name: "wo_part", szoveg: "GYR tételkód" },
            { name: "pt_desc", szoveg: "Megnevezés" },
            { name: "wo_qty_ord", szoveg: "Mennyiség" },
            { name: "part_um", szoveg: "Mértékegység" },
            { name: "wo_line", szoveg: "Gyártósor" },
            { name: "ln_desc", szoveg: "Gyártósor megnevezés" },
            { name: "item_per_hour", szoveg: "Óránkénti elkészülési egység" },
            { name: "wo_est_run", szoveg: "Várható elkészülési idő" },
            { name: "wo_seq", szoveg: "sorrend", input: { type: "number", step: 10 } },
            { name: "wo_rel_date", szoveg: "Kibocsátási dátum" },
            { name: "wo_start_date", szoveg: "Esedékesség dátum" },
            { name: "wo_start_time", szoveg: "Kezdési idő" },
            { name: "wo_end_time", szoveg: "Végzési idő" },
            { name: "wo_pld_downtime", szoveg: "Tervezett állási idő" },
            { name: "wo_unpld_downtime", szoveg: "Nem tervezett állási idő" },
        ];

    xwoDataChangedSub: Subscription;
    dtTableInputSub: Subscription;
    constructor(private datatableservice: DataTableService, private dataStorageService: DataStorageService, private woService: WoService) {
    }

    ngOnInit() {
        this.xwoDataChangedSub =  this.woService.xwoDataChanged.subscribe(
            (data)=>{
                this.xwoData = [...data.map(xwo=>{return{...xwo}})];
                this.sortedWodData = [...this.xwoData.map(xwo=>{return{...xwo}})];
                
                this.datatableservice.emitDataChanged(this.sortedWodData.slice());
            }
        );
        this.dtTableInputSub = this.datatableservice.inputDataChanged.subscribe(
            (data)=>{
                console.log(data);
                console.log(this.xwoData);
                
            }
        );
        this.dataStorageService.fetchUtemterv(1,'line_01')
        .pipe(
            tap({
            next: (data) => this.woService.setXWos(data),
            error: (error) => this.handleError(error)
        }))
        .subscribe();
        
    }
    
    onHandleError() {
        this.error = null;
        this.woService.woError = null;
      
        /* adat vissza állítás*/
      }
    
      handleError(errorRes: HttpErrorResponse) {
    
        let errorMessage = 'An unknown error occurred!';
      
    
          switch (errorRes.error) {
            case "SEQ_ERROR":
              errorMessage = "There are more then on workorder with the same seq"
              break;
            
            case "UNKNOWN_ERROR":
                errorMessage = "An unknown error occurred";
    
            default:
              errorMessage = "An unknown error occurred";
              break;
          }
     
        this.error = errorMessage;
        this.woService.woError = this.error;
        return throwError(errorMessage);
      }
    ngOnDestroy(): void {
        this.xwoDataChangedSub.unsubscribe();
    }
}

