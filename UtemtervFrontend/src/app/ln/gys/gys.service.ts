import { Injectable } from '@angular/core';
import { Gys } from './gys-model';
import { Subject } from 'rxjs';

@Injectable()
export class GysService {
    gysValtozas = new Subject<Gys[]>();
    kivalasztottGys = new Subject<Gys>();

    private gyartosorok: Gys[] = [
        new Gys('ln_1', 'első gys'),
        new Gys('ln_2', 'a shortenpipe tesztelésének érdekében ez egy hosszabb leírás a shortenpipe tesztelésének érdekében ez egy hosszabb leírás a shortenpipe tesztelésének érdekében ez egy hosszabb leírás'),
        /* new Gys('ln_3', 'leiras'),
        new Gys('ln_4', 'mégegy leiras'),
        new Gys('ln_5', 'ln5 nek a leirasa'),
        new Gys('ln_6', 'ln6ln6ln6'),
        new Gys('ln_7', 'a shortenpipe tesztelésének érdekében ez egy hosszabb leírás'),
        new Gys('ln_8', 'ez a szöveg 30 karakter hosszú'), */
    ];

    //megkeresi egy adott gys-nek az indexét. Ha nincs ilyen -1 et ad vissza.
    getGysIndex(gys: string) {
        return this.gyartosorok.findIndex(index => index.ln_id === gys);
    }

    getGysek() {
        return this.gyartosorok.slice();
    }

    getGys(gys: string) { 
        let index = this.getGysIndex(gys)
        return this.gyartosorok[index]
    }


    letezikeGys(gys: string) {
        let index = this.getGysIndex(gys)

        if (index < 0) {
            return false
        }

        if (index >= 0) {
            return true
        }
    }

    ujGys(id: string, desc: string) {
        console.log("uj gys: " + id, desc);
        this.gyartosorok.push(new Gys(id, desc));
        this.gysValtozas.next(this.gyartosorok.slice());
    }

    modositGys(gys: string, uj_id: string, uj_desc: string) {
        let index = this.getGysIndex(gys)
        this.gyartosorok[index].ln_id = uj_id;
        this.gyartosorok[index].ln_desc = uj_desc;
        //this.gysValtozas.next(this.gyartosorok.slice());
    }

    torolGys(gys: string) {
        let index = this.getGysIndex(gys)
        this.gyartosorok.splice(index, 1);
        this.gysValtozas.next(this.gyartosorok.slice());

    }
}
