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
    console.log('setting pts');
    console.log(pts);

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

  savePart(part: Pt) {
    if (this.getPart(part.pt_part)) {
      //ha létezik ilyen pt_part-tel part, updateljuk
      for (let i = 0; i < this.partData.length; i++) {
        if (this.partData[i].pt_part == part.pt_part) {
          this.partData[i] = part;
        }
      }
    } else {
      this.partData.push(part);
    }

    this.partDataChanged.next(this.partData.slice());
  }

  deletePart(id: number) {
    //console.log(this.getPart(id));

    if (this.getPart(id)) {
      this.partData.splice(this.partData.indexOf(this.getPart(id)), 1);
      this.partDataChanged.next(this.partData.slice());
    }
  }
}
