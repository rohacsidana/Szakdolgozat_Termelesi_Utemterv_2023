import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Sk } from './sk-model';

@Injectable({
    providedIn: 'root',
})
export class SkService {
    skValtozas = new Subject<Sk[]>();
    kivalasztottSk = new EventEmitter<Sk>();
    private sebessegKezelesek: Sk[] = [
        new Sk('lnd_1', 1, 20),
        new Sk('lnd_2', 1, 30),
        new Sk('lnd_3', 2, 10),
        new Sk('lnd_4', 2, 20),
        new Sk('lnd_5', 3, 30),
        new Sk('lnd_6', 3, 40),
    ];

    getOsszSk() {
        return this.sebessegKezelesek.slice()
    }

    getSk(line: string) {

    }


    letezikeSk(line: string, part: number) {
        let index = this.sebessegKezelesek.findIndex(index => index.lnd_line === line
            && index.lnd_part === part);

            if (index < 0) {
                return false
            }

            if (index >= 0) {
                return true
            }



        //this.skValtozas.next(this.sebessegKezelesek.slice());
    }

    ujSk(line: string, part: number, rate: number) {
        this.sebessegKezelesek.push(new Sk(line, part, rate));
        this.skValtozas.next(this.sebessegKezelesek.slice());
    }

    modositSk(line: string, part: number, uj_line: string, uj_part: number, uj_rate: number) {
        let index = this.sebessegKezelesek.findIndex(index => index.lnd_line === line
            && index.lnd_part === part);
        this.sebessegKezelesek[index].lnd_line = uj_line;
        this.sebessegKezelesek[index].lnd_part = uj_part;
        this.sebessegKezelesek[index].lnd_rate = uj_rate;

        this.skValtozas.next(this.sebessegKezelesek.slice());
    }

    torolSk(line: string) {
        let index = this.sebessegKezelesek.findIndex(index => index.lnd_line === line);
        this.sebessegKezelesek.splice(index, 1);
        this.skValtozas.next(this.sebessegKezelesek.slice());
    }
}
