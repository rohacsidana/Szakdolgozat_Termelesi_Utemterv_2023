import { Injectable, EventEmitter } from '@angular/core';
import { Gys } from './gys-model';
import { Subject } from 'rxjs';

@Injectable()
export class GysService {
    gysValtozas = new Subject<Gys[]>();
    gyIndex = new Subject<number>()
    kivalasztottGys = new EventEmitter<Gys>();
    //kivalasztottGys = new Subject<Gys>()
    //kivalasztottGysS = new Subject<number>()

    private gyartosorok: Gys[] = [
        new Gys('ln_1', 'első gys'),
        new Gys('ln_2', 'a shortenpipe tesztelésének érdekében ez egy hosszabb leírás'),
        /* new Gys('ln_3', 'leiras'),
        new Gys('ln_4', 'mégegy leiras'),
        new Gys('ln_5', 'ln5 nek a leirasa'),
        new Gys('ln_6', 'ln6ln6ln6'),
        new Gys('ln_7', 'a shortenpipe tesztelésének érdekében ez egy hosszabb leírás'),
        new Gys('ln_8', 'ez a szöveg 30 karakter hosszú'), */
    ];

    getGysek() {
        return this.gyartosorok.slice();
    }

    getGys(gys: string) {
        for (let index = 0; index < this.gyartosorok.length; index++) {
            if (this.gyartosorok[index].ln_id === gys) {
                return this.gyartosorok[index]
            }

        }
        this.gysValtozas.next(this.gyartosorok.slice());
    }

    
    letezikeGys(gy: string) {
        console.log("gyartosorok:");       
        console.log(this.gyartosorok);
        for (let index = 0; index < this.gyartosorok.length; index++) {
            if (this.gyartosorok[index].ln_id === gy) {
                return true
            } else {
                return false
            }
            
        }
        
        
    }
    
    ujGys(id: string, desc: string) {
        console.log("uj gys: " + id, desc);

        this.gyartosorok.push(new Gys(id, desc));
       
        
        this.gysValtozas.next(this.gyartosorok.slice());
    }

    modositGys(id: string, uj_id: string, uj_desc: string) {
        let index = this.gyartosorok.findIndex(index => index.ln_id === id);
        this.gyartosorok[index].ln_id = uj_id;
        this.gyartosorok[index].ln_desc = uj_desc;
        //this.gysValtozas.next(this.gyartosorok.slice());
    }

    torolGys(id: string) {
        let index = this.gyartosorok.findIndex(index => index.ln_id === id);
        this.gyartosorok.splice(index, 1);
        this.gysValtozas.next(this.gyartosorok.slice());

    }
}
