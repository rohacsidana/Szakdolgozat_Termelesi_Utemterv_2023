import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pt } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class PartService {
  partDataChanged: Subject<Pt[]> = new Subject<Pt[]>();
  private partData: Pt[] = [];

  setPts(pts: Pt[]) {
    //console.log('setting pts');
    //console.log(pts);
    this.partData = pts;
    this.partDataChanged.next(this.partData.slice());
  }

  getParts() {
    return this.partData.slice();
  }

  getPart(id: number): Pt {
    for (let i = 0; i < this.partData.length; i++) {
      if (this.partData[i].pt_part == id) {
        return this.partData[i];
      }
    }
  }

  updatePart(part: Pt) {
    for (let i = 0; i < this.partData.length; i++) {
      if (this.partData[i].pt_part == part.pt_part) {
        this.partData[i] = part;
      }
    }

    this.partDataChanged.next(this.partData.slice());
  }
  newPart(part: Pt) {
    this.partData.push(part);
    console.log(part);
    this.partDataChanged.next(this.partData.slice());
  }

  deletePart(id: number) {
    this.partData.splice(this.partData.indexOf(this.getPart(id)), 1);
    this.partDataChanged.next(this.partData.slice());
  }
}
