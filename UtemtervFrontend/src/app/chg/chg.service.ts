import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Chg } from '../data-table/data-table.service';


@Injectable({
    providedIn: 'root',
})
export class ChgService {
    chgChanged = new Subject<Chg[]>();

    private changeTimes: Chg[] = [
        /* { chg_line: 'ln_1', chg_from: 1, chg_to: 2, chg_time: '00:15' },
        { chg_line: 'ln_2', chg_from: 2, chg_to: 3, chg_time: '00:20' }, */
    ]

    setChangeTimes(chgs: Chg[]) {
        this.changeTimes = chgs
        this.chgChanged.next(this.changeTimes.slice())
    }

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

    editChg(line: string, from: number, to: number, newChg: Chg) {
        let index = this.getChgIndex(line, from, to)
        this.changeTimes[index].chg_line = newChg.chg_line;
        this.changeTimes[index].chg_from = newChg.chg_from
        this.changeTimes[index].chg_to = newChg.chg_to
        this.changeTimes[index].chg_time = newChg.chg_time
    }

    deleteChg(line: string, from: number, to: number) {
        let index = this.getChgIndex(line, from, to)        
        this.changeTimes.splice(index, 1);
        this.chgChanged.next(this.changeTimes.slice())
        console.log(this.getChangeTimes());
        
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
