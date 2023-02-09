import { Injectable } from '@angular/core';
import { Pt } from 'src/app/shared/interfaces';

@Injectable()
export class PartService {
  private partData: Pt[] = [
    {
      pt_part: 0,
      pt_desc: 'Asztal',
      pt_um: 'db',
    },
    {
      pt_part: 1,
      pt_desc: 'Számítógép',
      pt_um: 'db',
    },
    {
      pt_part: 2,
      pt_desc: 'Táska',
      pt_um: 'db',
    },
    {
      pt_part: 3,
      pt_desc: 'Müzli',
      pt_um: 'kg',
    },
    {
      pt_part: 4,
      pt_desc: 'Fa lap',
      pt_um: 'm',
    },
    {
      pt_part: 5,
      pt_desc: 'Csúszásgátló',
      pt_um: 'db',
    },
    {
      pt_part: 6,
      pt_desc: 'Processzor',
      pt_um: 'db',
    },
  ];

  getParts() {
    return this.partData.slice();
  }

  getPart(id: number): Pt {
    for (let i = 0; i < this.partData.length; i++) {
      if (this.partData[i].pt_part == id) {
        return this.partData[i];
      }
    }
  }

  savePart(part: Pt) {
    if (this.getPart(part.pt_part)) {
      //ha létezik ilyen pt_part-tel part, updateljuk
      for (let i = 0; i < this.partData.length; i++) {
        if (this.partData[i].pt_part == part.pt_part) {
          this.partData[i] = part;
        }
      }
    } else {
      this.partData.push(part);
    }
  }

  deletePart(id: number) {
    console.log(this.getPart(id));

    if (this.getPart(id)) {
      this.partData.splice(this.partData.indexOf(this.getPart(id)), 1);
    }
  }
}
