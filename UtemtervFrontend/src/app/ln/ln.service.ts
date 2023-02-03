import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ln } from '../data-table/data-table.service';

@Injectable()
export class LnService {
    lnChanged = new Subject<Ln[]>();

    private lines: Ln[] = [
        { ln_line: 'ln_1', ln_desc: 'leiras1' },
        { ln_line: 'ln_2', ln_desc: 'leiras2' },
    ]

    getLines() {
        return this.lines.slice()
    }

    getLnIndex(line: string) {
        return this.lines.findIndex(index => index.ln_line === line)
        
    }

    newLine(newLnd: Ln) {
        this.lines.push(newLnd)
        this.lnChanged.next(this.lines.slice())
    }

    editLine(line: string, newLn: Ln) {
        let index = this.getLnIndex(line)
        this.lines[index].ln_line = newLn.ln_line;
        this.lines[index].ln_desc = newLn.ln_desc;
    }

    deleteLine(line: string) {
        let index = this.getLnIndex(line)        
        this.lines.splice(index, 1);
        this.lnChanged.next(this.lines.slice())
        console.log(this.getLines());
        
    }

    doesLnExist(line: string) {
        let index = this.getLnIndex(line)

        if (index < 0) {
            return false
        }

        if (index >= 0) {
            return true
        }
    }

}