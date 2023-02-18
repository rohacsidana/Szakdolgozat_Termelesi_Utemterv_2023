import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lad, Wo, Wod, XWo } from '../shared/interfaces';
@Injectable({
  providedIn: 'root',
})
export class WoService {
  constructor() {}
  /*lad és wod értékei*/
  woData: Wo[] = [];
  woDataChanged = new Subject<Wo[]>();
  wodData: Wod[] = [];

  wodDataChanged = new Subject<Wod[]>();
  ladData: Lad[] = [];
  ladDataChanged = new Subject<Lad[]>();
  getDataFromTable = new Subject<any>();
  selectedWo: Wo = null;
  woError: string = null;
  xwoData: XWo[] =  [];
  xwoDataChanged = new Subject<XWo[]>();

  addWoData(wo: Wo) {
    this.woData.push(wo);
    this.woDataChanged.next(this.woData.slice());
  }
  deleteWo(lot: number) {
    const delWo = (wo)=> wo.wo_lot === lot;
    let index = this.woData.findIndex(delWo);
    this.woData.splice(index,1);
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
    let index = this.woData.findIndex(
      (element) => element.wo_lot === wo.wo_lot
    );
    this.woData[index] = {
      ...this.woData[index],
      ...wo,
    };
    this.woDataChanged.next(this.woData.slice());
  }

  setWoData(woData: Wo[]) {
    this.woData = woData.slice();
    this.woDataChanged.next(this.woData.slice());
  }

  setLadData(ladData) {
    this.ladData = ladData.slice();
    this.ladDataChanged.next(this.ladData.slice());
  }

  setWodData(wodData) {
    this.wodData = wodData.slice();
    this.wodDataChanged.next(this.wodData.slice());
  }

  getWo(woLot: number) {
    if (this.woData.length !== 0) {
      return this.woData.find((element) => element.wo_lot === woLot);
    } else {
      return null;
    }
    /*  else {
             return this.DataStorageService.fetchWo(woLot);
         } */
    /* return apihívás */
  }

  setXWos(xwos){
    this.xwoData = xwos.slice();
    this.xwoDataChanged.next([...this.xwoData]);
  }
  setXWo(newXwo){

    let index = this.xwoData.findIndex((value)=>{
      return value.wo_lot === newXwo.wo_lot
    });
    const xwo = this.xwoData[index];
    const updatedXwo = {
      ...xwo,
      ...newXwo
    }
    const updatedXwos = [...this.xwoData]
    updatedXwos[index] = updatedXwo;
    this.xwoData = [...updatedXwos]
    this.xwoDataChanged.next([...this.xwoData]);
    
  }

  addWo(wo){
    console.log(wo);
    
    const newWo = {...wo};
    const newWos = [...this.woData, {...newWo}];
    this.woData = [...newWos]
    this.woDataChanged.next([...this.woData]);
  }
}
