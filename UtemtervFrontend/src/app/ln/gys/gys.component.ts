import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  Injectable,
  Input,
  OnDestroy,
} from '@angular/core';
import { GysService } from './gys.service';
import { Gys } from './gys-model';
import { GysListComponent } from '../gys-list/gys-list.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gys',
  templateUrl: './gys.component.html',
  styleUrls: ['./gys.component.css'],
})
export class GysComponent {
  @Input() gyartosor: Gys;

  //gyartosorok: { ln_id: string, ln_desc: string }[] = [];

  constructor(private gysService: GysService) { }

  onModositas() {
    //this.gyList.modositas
    //console.log("gy-comp:");
    //console.log(this.gyartosorok[id]);
    //this.gysService.kivalasztottGys.emit(this.kijeloltGys)
    //return this.gyartosorok[id];
    this.gysService.kivalasztottGys.next(this.gyartosor);
    //console.log(this.gyartosor);
  }

  onReszletek(leiras: string) {
    alert(leiras + '\n(ez nem alert box lesz később!)');
  }
}
