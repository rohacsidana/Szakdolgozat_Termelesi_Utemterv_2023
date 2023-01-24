import { Component, Output, EventEmitter, OnInit, Injectable, Input } from '@angular/core';
import { GysService } from './gys.service';
import { Gys } from './gys-model';
import { GysListComponent } from '../gys-list/gys-list.component';

@Component({
  selector: 'app-gys',
  templateUrl: './gys.component.html',
  styleUrls: ['./gys.component.css']
})
export class GysComponent implements OnInit {
  @Input() gyartosor: Gys

  //gyartosorok: { ln_id: string, ln_desc: string }[] = [];
  gyartosorok: Gys[];

  constructor(private gysService: GysService, private gyList: GysListComponent) { }

  ngOnInit(): void {
    this.gyartosorok = this.gysService.getGysek()
    //console.log(this.gyartosorok);

  }

  onModositas() {
    //this.gyList.modositas
    //console.log("gy-comp:");
    //console.log(this.gyartosorok[id]);
    //this.gysService.kivalasztottGys.emit(this.kijeloltGys)
    //return this.gyartosorok[id];
    this.gysService.kivalasztottGys.next(this.gyartosor);
    console.log(this.gyartosor);

  }

  onReszletek(leiras: string) {
    alert(leiras + "\n(ez nem alert box lesz később!)")
  }
}
