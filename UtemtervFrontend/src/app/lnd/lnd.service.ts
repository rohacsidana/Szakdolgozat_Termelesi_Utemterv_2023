import { Injectable } from '@angular/core';
import { Lnd } from '../data-table/data-table.service';


@Injectable()
export class SkService {
    private rates: Lnd[] = [
        {lnd_line: 'lnd_1', lnd_part: 1, lnd_rate: 20},
        {lnd_line: 'lnd_2', lnd_part: 2, lnd_rate: 30},
    ]

    getRates() {
        return this.rates.slice()
    }
}
