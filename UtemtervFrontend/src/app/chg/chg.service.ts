import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Chg } from '../data-table/data-table.service';


@Injectable({
    providedIn: 'root',
})
export class ChgService {
    chgChanged = new Subject<Chg[]>();

    private changeTimes: Chg[] = [
        { chg_line: 'ln_1', chg_from: 1, chg_to: 2, chg_time: '00:15' },
        { chg_line: 'ln_2', chg_from: 2, chg_to: 3, chg_time: '00:20' },
    ]

    getChangeTimes() {
        return this.changeTimes.slice()
    }

    getChgIndex(line: string, from: number, to: number) {
        return this.changeTimes.findIndex(index => index.chg_line === line
            && index.chg_from === from && index.chg_to === to);
    }

    newChg(newChg: Chg) {
        this.changeTimes.push(newChg)
        this.chgChanged.next(this.changeTimes.slice())
    }

    doesChgExist(line: string, from: number, to: number) {
        let index = this.getChgIndex(line, from, to)

        if (index < 0) {
            return false
        }

        if (index >= 0) {
            return true
        }
    }

}
