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
export class GysComponent implements OnInit, OnDestroy {
  @Input() gyartosor: Gys;

  constructor(private gysService: GysService) { }

  ngOnInit(): void {
    //this.gysService.kivalasztottGys.emit(this.gyartosor)
  }

  onTeszt() {

  }

  ngOnDestroy(): void {
    this.gysService.kivalasztottGys.next()
  }
  
  onReszletek(leiras: string) {
    //alert(leiras + '\n(ez nem alert box lesz később!)');
    this.gysService.kivalasztottGys.emit(this.gyartosor)
  }


  /* onModositas() {
    //this.gyList.modositas
    //console.log("gy-comp:");
    //console.log(this.gyartosorok[id]);
    //this.gysService.kivalasztottGys.emit(this.kijeloltGys)
    //return this.gyartosorok[id];
    this.gysService.kivalasztottGys.next(this.gyartosor);

    //console.log(this.gyartosor);
  } */

}
