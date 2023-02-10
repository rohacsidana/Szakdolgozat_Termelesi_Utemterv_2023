import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Lnd } from '../shared/interfaces';
import { LnService } from '../ln/ln.service';


@Injectable(
    { providedIn: 'root'}
)
export class LndService {
    lndChanged = new Subject<Lnd[]>()

    constructor(private lnService: LnService) {}

    private rates: Lnd[] = [
        /* {lnd_line: 'lnd_1', lnd_part: 1, lnd_rate: 20},
        {lnd_line: 'lnd_2', lnd_part: 2, lnd_rate: 30}, */
    ]

    setLnds(lnds: Lnd[]) {
        
        this.rates = lnds
        this.lndChanged.next(this.rates.slice())
    }

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

    editLnd(line: string, part: number, newLnd: Lnd) {
        let index = this.getLndIndex(line, part)
        this.rates[index].lnd_line = newLnd.lnd_line;
        this.rates[index].lnd_part = newLnd.lnd_part;
    }

    deleteLine(line: string, part: number) {
        let index = this.getLndIndex(line, part)
        this.rates.splice(index, 1);
        this.lndChanged.next(this.rates.slice())
        console.log(this.getRates());

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

    doesLineExists(line: string) {
        return this.lnService.doesLnExist(line)
    }
}
