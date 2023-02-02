import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ak } from './ak-model';


@Injectable({
    providedIn: 'root',
})
export class AkService {
    akValtozas = new Subject<Ak[]>();
    kivalasztottAk = new EventEmitter<Ak>();
    private atallasKezelesek: Ak[] = [
        new Ak('lnd_1', 1, 2, '20'),
        new Ak('lnd_1', 1, 3, '30'),
        new Ak('lnd_2', 2, 3, '10'),
        new Ak('lnd_2', 2, 4, '20'),
        new Ak('lnd_3', 3, 4, '30'),
        new Ak('lnd_3', 3, 5, '40'),
    ];

    getOsszAk() {
        return this.atallasKezelesek.slice()
    }

    getAk(line: string) {

    }


    letezikeAk(line: string, from: number, to: number) {
        let index = this.atallasKezelesek.findIndex(index => index.chg_line === line
            && index.chg_from === from && index.chg_to === to);

            if (index < 0) {
                return false
            }

            if (index >= 0) {
                return true
            }



        //this.skValtozas.next(this.sebessegKezelesek.slice());
    }

    ujAk(line: string, from: number, to: number, time: string) {
        this.atallasKezelesek.push(new Ak(line, from, to, time));
        this.akValtozas.next(this.atallasKezelesek.slice());
    }

    modositAk(line: string, from: number, to: number, uj_line: string,
        uj_from: number, uj_to: number, uj_time: string) {
        let index = this.atallasKezelesek.findIndex(index => index.chg_line === line
            && index.chg_from === from && index.chg_to === to);

        this.atallasKezelesek[index].chg_line = uj_line;
        this.atallasKezelesek[index].chg_from = uj_from;
        this.atallasKezelesek[index].chg_to = uj_to;
        this.atallasKezelesek[index].chg_time = uj_time;

        this.akValtozas.next(this.atallasKezelesek.slice());
    }

    torolAk(line: string, from: number, to: number) {
        let index = this.atallasKezelesek.findIndex(index => index.chg_line === line
            && index.chg_from === from && index.chg_to === to);
        this.atallasKezelesek.splice(index, 1);
        this.akValtozas.next(this.atallasKezelesek.slice());
    }
}
