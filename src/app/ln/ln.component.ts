import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gys } from './gys/gys-model';
import { GysService } from './gys/gys.service';
import { UserComponent } from '../user/user.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css']
})
export class LnComponent implements OnInit, OnDestroy {
  gyartosor: Gys

  constructor(private gysService: GysService) { }

  ngOnInit(): void {
    this.gysService.kivalasztottGys
      .subscribe(
        (gys: Gys) => {
          this.gyartosor = gys;
        }
      )
  }

  onUjGys(form: NgForm) {
    const value = form.value
    this.gysService.ujGys(value.azon, value.desc)
  }

  ngOnDestroy(): void {
    this.gysService.kivalasztottGys.unsubscribe()
  }



}
