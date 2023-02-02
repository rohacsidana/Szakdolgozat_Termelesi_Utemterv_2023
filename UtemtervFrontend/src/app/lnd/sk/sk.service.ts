import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Sk } from './sk-model';

@Injectable({
    providedIn: 'root',
})
export class SkService {
    skValtozas = new Subject<Sk[]>();
    kivalasztottSk = new Subject<Sk>();
    private sebessegKezelesek: Sk[] = [
        new Sk('lnd_1', 1, 20),
        new Sk('lnd_2', 1, 30),
        new Sk('lnd_3', 2, 10),
        new Sk('lnd_4', 2, 20),
        new Sk('lnd_5', 3, 30),
        new Sk('lnd_6', 3, 40),
    ];

    //megkeresi egy adott sk-nak az indexét. Ha nincs ilyen -1 et ad vissza.
    getSkIndex(line: string, part: number) {
        let index = this.sebessegKezelesek.findIndex(index => index.lnd_line === line
            && index.lnd_part === part);

        return index
    }

    getOsszSk() {
        return this.sebessegKezelesek.slice()
    }

    getSk(line: string, part: number) {
        let index = this.getSkIndex(line, part)

        return this.sebessegKezelesek[index]
        //return index
    }


    letezikeSk(line: string, part: number) {
        let index = this.getSkIndex(line, part)

        if (index < 0) {
            return false
        }

        if (index >= 0) {
            return true
        }
    }

    ujSk(line: string, part: number, rate: number) {
        this.sebessegKezelesek.push(new Sk(line, part, rate));
        this.skValtozas.next(this.sebessegKezelesek.slice());
    }

    modositSk(line: string, part: number, uj_line: string, uj_part: number, uj_rate: number) {
        let index = this.getSkIndex(line, part)
        this.sebessegKezelesek[index].lnd_line = uj_line;
        this.sebessegKezelesek[index].lnd_part = uj_part;
        this.sebessegKezelesek[index].lnd_rate = uj_rate;

        //this.skValtozas.next(this.sebessegKezelesek.slice());
    }

    torolSk(line: string, part: number) {
        let index = this.getSkIndex(line, part)
        this.sebessegKezelesek.splice(index, 1);
        this.skValtozas.next(this.sebessegKezelesek.slice());
    }
}
