import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GysService } from '../gys/gys.service';
import { Gys } from '../gys/gys-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gys-list',
  templateUrl: './gys-list.component.html',
  styleUrls: ['./gys-list.component.css'],
})
export class GysListComponent implements OnInit, OnDestroy {
  @Input() gyartosor: Gys;
  gysValtozas: Subscription;
  modositas = false;
  gyartosorok: Gys[];
  @Input() keresettGys: string
  kereses = ""

  constructor(private gysService: GysService) { }

  ngOnInit(): void {
    this.gyartosorok = this.gysService.getGysek();
    //console.log(this.gyartosorok);
    this.gysValtozas = this.gysService.gysValtozas.subscribe((data) => {
      this.gyartosorok = data;
    });
  }

  onModositas() {
    this.modositas = true;
    //console.log("gy-comp:");
    //console.log(this.gyartosorok[id]);
  }

  onReszletek(leiras: string) {
    alert(leiras + '\n(ez nem alert box lesz később!)');
  }

  ngOnDestroy() {
    this.gysValtozas.unsubscribe();
  }
}
