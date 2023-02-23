import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lad, Wo, Wod, XWo } from '../shared/interfaces';
@Injectable({
  providedIn: 'root',
})
export class WoService {
  constructor() { }
  /*lad és wod értékei*/
  woData: Wo[] = [];
  wodData: Wod[] = [];
  ladData: Lad[] = [];
  xwoData: XWo[] = [];

  woDataChanged = new Subject<Wo[]>();
  wodDataChanged = new Subject<Wod[]>();
  ladDataChanged = new Subject<Lad[]>();
  xwoDataChanged = new Subject<XWo[]>();
  selectedWoChanged = new Subject<Wo>();
  errorChanged = new Subject<string>();
  editingChanged = new Subject<boolean>();

  selectedWo: Wo = null;
  woError: string = null;
  editing: boolean = false;

  addWoData(wo: Wo) {
    this.woData.push(wo);
    this.woDataChanged.next(this.woData.slice());
  }
  deleteWo(lot: number) {
    const delWo = (wo) => wo.wo_lot === lot;
    let index = this.woData.findIndex(delWo);
    this.woData.splice(index, 1);
  }
  setSelectedWo(wo: Wo) {
    this.selectedWo = { ...wo };
    this.selectedWoChanged.next({ ...this.selectedWo });
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
    const newWoData = [...woData];
    const updatedWoData = [...this.woData, ...newWoData]

    this.woData = [...updatedWoData];
    this.woDataChanged.next([...this.woData]);
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

  }

  setXWos(xwos) {
    this.xwoData = xwos.slice();
    this.xwoDataChanged.next([...this.xwoData]);
  }
  setXWo(newXwo) {

    let index = this.xwoData.findIndex((value) => {
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

  addWo(wo) {
    const newWo = { ...wo };
    const newWos = [...this.woData, { ...newWo }];
    this.woData = [...newWos]
    this.woDataChanged.next([...this.woData]);
  }

  updateWod(wod) {

    let index = this.wodData.findIndex((value) => {
      return value.wod_part === wod.wod_part && value.wod_par === wod.wod_par
    });
    const newWod = this.wodData[index];
    const updatedWod = {
      ...newWod,
      ...wod
    }
    const updatedWods = [...this.wodData]
    updatedWods[index] = updatedWod;
    this.wodData = [...updatedWods]
    this.wodDataChanged.next([...this.wodData]);

  }
  updateLad(lad) {


    let index = this.ladData.findIndex((value) => {
      return value.lad_id = lad.lad_id
    });
    const newLad = this.ladData[index];
    const updatedLad = {
      ...newLad,
      ...lad
    }
    const updatedWods = [...this.ladData]
    updatedWods[index] = updatedLad;
    this.ladData = [...updatedWods]
    this.ladDataChanged.next([...this.ladData]);

  }

  setWoError(error) {
    this.woError = error;
    this.errorChanged.next(error);
  }
  isUtemezheto() {
    let index = 0
    while (index < this.xwoData.length && !(this.xwoData[index].wo_seq == null)) {
      index++;
    }
    return index >= this.xwoData.length;
  }

  setEditing(bool: boolean){
    this.editing = bool;
    this.editingChanged.next(this.editing);
  }
}
