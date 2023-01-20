import { Injectable } from '@angular/core';
@Injectable()
export class Gys {
    gyartosorok = [
        {
            ln_id: 'ln_1',
            ln_desc: 'ez az első gyártósor',
        },
        {
            ln_id: 'ln_2',
            ln_desc: 'ez a második gyártósor',
        },
    ]

    ujGys(id: string, desc: string) {
        this.gyartosorok.push({ ln_id: id, ln_desc: desc });

    }

}

