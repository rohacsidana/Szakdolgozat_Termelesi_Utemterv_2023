import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ln } from '../shared/interfaces';

@Injectable({ providedIn: 'root' })
export class LnService {
  lnChanged = new Subject<Ln[]>();

  private lines: Ln[] = [];

  setLines(lns: Ln[]) {
    this.lines = lns;
    console.log("lnservice");
    
    console.log(this.lines);
    this.lnChanged.next(this.lines.slice());
  }

  getLines() {
    console.log("lekérem");
    
    return this.lines.slice();
  }

  getLnIndex(line: string) {
    return this.lines.findIndex((index) => index.ln_line === line);
  }

  newLine(newLn: Ln) {
    this.lines.push(newLn);
    this.lnChanged.next(this.lines.slice());
    /* console.log("új ln felvéve");
        console.log(this.lines); */
  }

  editLine(line: string, newDesc: string) {
    let index = this.getLnIndex(line);
    this.lines[index].ln_desc = newDesc;
  }

  deleteLine(line: string) {
    let index = this.getLnIndex(line);
    this.lines.splice(index, 1);
    this.lnChanged.next(this.lines.slice());
    console.log(this.getLines());
  }

  doesLnExist(line: string) {
    let index = this.getLnIndex(line);

    if (index < 0) {
      return false;
    }

    if (index >= 0) {
      return true;
    }

  }
}
