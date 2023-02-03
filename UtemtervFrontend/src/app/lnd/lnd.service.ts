import { Injectable } from '@angular/core';
import { Lnd } from '../data-table/data-table.service';
import { Subject } from 'rxjs';


@Injectable()
export class LndService {
    lndChanged = new Subject<Lnd[]>()

    private rates: Lnd[] = [
        {lnd_line: 'lnd_1', lnd_part: 1, lnd_rate: 20},
        {lnd_line: 'lnd_2', lnd_part: 2, lnd_rate: 30},
    ]

    getRates() {
        return this.rates.slice()
    }

    getLndIndex(line: string, part: number) {
        let index = this.rates.findIndex(index => index.lnd_line === line
            && index.lnd_part === part);

        return index
    }

    newRate(newLnd: Lnd) {
        this.rates.push(newLnd)
        this.lndChanged.next(this.rates.slice())
    }

    doesLndExist(line: string, part: number) {
        let index = this.getLndIndex(line, part)

        if (index < 0) {
            return false
        }

        if (index >= 0) {
            return true
        }
    }
}
