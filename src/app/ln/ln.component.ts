import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gys } from './gys/gys-model';
import { GysService } from './gys/gys.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css']
})
export class LnComponent implements OnInit, OnDestroy {
  gyartosor: Gys
  vanIlyenGys: boolean
  validForm = true

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
    console.log(value);


    this.vanIlyenGys = this.gysService.letezikeGys(value.azon)
    if (!this.vanIlyenGys) {
      this.gysService.ujGys(value.azon, value.desc)
      this.validForm = true
    } else {
      this.validForm = false
    }


  }

  ngOnDestroy(): void {
    this.gysService.kivalasztottGys.unsubscribe()
  }



}
