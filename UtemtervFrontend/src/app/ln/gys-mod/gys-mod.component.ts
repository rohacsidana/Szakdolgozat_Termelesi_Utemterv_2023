import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GysService } from '../gys/gys.service';
import { Gys } from '../gys/gys-model';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material/icon';

@Component({
  selector: 'app-gys-mod',
  templateUrl: './gys-mod.component.html',
  styleUrls: ['./gys-mod.component.css'],
})
export class GysModComponent implements OnInit, OnDestroy {
  @Input() gyartosor: Gys;
  kivalasztottGys: Gys;
  gysForm: FormGroup;
  id: string
  desc: string

  constructor(private gysService: GysService) { }

  ngOnInit(): void {
    /*this.gysService.kivalasztottGysS.subscribe(
      (index: number) => {
        this.kivalasztottGys = index;
      }
    )*/

    this.gysService.kivalasztottGys
      .subscribe(
        (gys: Gys) => {
          this.gyartosor = gys;
        }
      )

    this.id = this.gyartosor.ln_id
    this.desc = this.gyartosor.ln_desc

  }

  /*private initForm() {
    this.gysService.kivalasztottGys
      .subscribe(
        (gys: Gys) => {
          this.gyartosor = gys;
        }
      )
  }*/


  onSzerkesztes(form: NgForm) {
    const value = form.value
    //console.log(this.gyartosor);
    //console.log(form);


    console.log(value);

    this.gysService.modositGys(this.gyartosor.ln_id, value.azon, value.desc)
    this.clearForm()
  }


  clearForm() {
    this.gysService.kivalasztottGys.next();
  }

  onMegse() {
    this.clearForm();
  }

  onTorol() {
    //array.indexOf(searchElement[, fromIndex])
    console.log(this.gysService.getGysek());
    this.gysService.torolGys(this.gyartosor.ln_id);

    //console.log(this.kivalasztottGys);
    console.log(this.gysService.getGysek());
    console.log("ez:" + this.gyartosor.ln_id);

    this.clearForm();

  }

  ngOnDestroy(): void {
    this.gysService.kivalasztottGys.unsubscribe()
  }

}
