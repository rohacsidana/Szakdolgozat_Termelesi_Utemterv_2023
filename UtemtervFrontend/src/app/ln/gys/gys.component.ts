import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { GysService } from './gys.service';
import { Gys } from './gys-model';

@Component({
  selector: 'app-gys',
  templateUrl: './gys.component.html',
  styleUrls: ['./gys.component.css'],
})
export class GysComponent implements OnInit, OnDestroy {
  @Input() gyartosor: Gys;

  constructor(private gysService: GysService) { }

  ngOnInit(): void { }


  ngOnDestroy(): void { }

  onReszletek() {
    //átadja a kivalasztottGys-nek a kiválasztott gyártósort
    this.gysService.kivalasztottGys.next(this.gyartosor)
    //console.log(this.gyartosor);

  }
}
