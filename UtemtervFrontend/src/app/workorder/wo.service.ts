import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Lad, Wo, Wod } from "../shared/interfaces";
@Injectable({
    providedIn: 'root'
})
export class WoService {
    constructor() { }
    /*lad és wod értékei*/
    woData: Wo[] = [];
    woDataChanged = new Subject<Wo[]>();
    wodData: Wod[] = [];

    wodDataChanged = new Subject<Wod[]>();
    ladData: Lad[] = [];
    ladDataChanged = new Subject<Lad[]>();
    selectedWo: Wo = null;
    woError: string = null;
    addWoData(wo: Wo) {
        this.woData.push(wo);
        this.woDataChanged.next(this.woData.slice());
    }

    setSelectedWo(wo: Wo) {
        this.selectedWo = wo;
    }
    getSelectedWo() {
        return this.selectedWo;
    }
    getWos() {
        return this.woData.slice();
    }

    getWods() {
        return this.wodData.slice();
    }
    getLads() {
        return this.ladData.slice();
    }

    updateWo(wo: Wo) {
        let index = this.woData.findIndex((element) => element.wo_lot === wo.wo_lot);
        this.woData[index] = {
            ...this.woData[index],
            ...wo
        };
        this.woDataChanged.next(this.woData.slice());
    }

    setWoData(woData: Wo[]) {
        this.woData = woData.slice();
        this.woDataChanged.next(this.woData.slice());
    }

    setLadData(ladData: Lad[]) {
        this.ladData = ladData.slice();
        this.ladDataChanged.next(this.ladData.slice());
    }

    setWodData(wodData: Wod[]) {
        this.wodData = wodData.slice();
        this.wodDataChanged.next(this.wodData.slice());
    }

    getWo(woLot: number) {

        if (this.woData.length !== 0) {

            return this.woData.find(element => element.wo_lot === woLot);
        } else {
            return null;
        }
        /*  else {
             return this.DataStorageService.fetchWo(woLot);
         } */
        /* return apihívás */


    }
}
