import { Injectable, EventEmitter } from '@angular/core';
import { Gys } from './gys-model';
import { Subject } from 'rxjs';

@Injectable()
export class GysService {
    gysValtozas = new Subject<Gys[]>()
    kivalasztottGys = new EventEmitter<Gys>()
    //kivalasztottGys = new Subject<Gys>()
    //kivalasztottGysS = new Subject<number>()

    private gyartosorok: Gys[] = [
        new Gys(
            'ln_1',
            'első gys'
        ),
        new Gys(
            'ln_2',
            'második gys'
        ),
        new Gys(
            'ln_3',
            'leiras'
        ),
        new Gys(
            'ln_4',
            'mégegy leiras'
        ),
        new Gys(
            'ln_5',
            'ln5 nek a leirasa'
        ),
        new Gys(
            'ln_6',
            'ln6ln6ln6'
        ),

    ]

    getGysek() {

        return this.gyartosorok.slice();

    }



    ujGys(id: string, desc: string) {
        this.gyartosorok.push(new Gys(id, desc))
        this.gysValtozas.next(this.gyartosorok.slice());
    }

    modositGys(id: number, uj_id: string, uj_desc: string) {
        this.gyartosorok[id].ln_id = uj_id
        this.gyartosorok[id].ln_desc = uj_desc
        this.gysValtozas.next(this.gyartosorok.slice());
    }

    torolGys(index: number) {
        this.gyartosorok.splice(index, 1)
        this.gysValtozas.next(this.gyartosorok.slice());
    }


}

