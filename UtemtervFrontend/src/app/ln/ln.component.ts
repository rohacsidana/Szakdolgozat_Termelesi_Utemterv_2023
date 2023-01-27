import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gys } from './gys/gys-model';
import { GysService } from './gys/gys.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css'],
})
export class LnComponent implements OnInit, OnDestroy {
  felvetel = false
  modositas = false
  reszletek = false
  gyartosor: Gys
  validForm = true
  sub: Subscription

  azon = ''
  desc = ''

  constructor(private gysService: GysService) {}

  ngOnInit(): void {
    this.sub = this.gysService.kivalasztottGys
      .subscribe(
        (gys: Gys) => {
          this.gyartosor = gys;
          this.azon = gys.ln_id
          this.desc = gys.ln_desc
          this.reszletek = true

        }
      )
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onSubmit(form: NgForm) {
    let value = form.value
    console.log("onSubmit:");
    console.log(value);

    if (this.felvetel) {
      this.onUjGys(value.azonInput, value.descInput)
    }
    this.onMegse()
    this.clearForm()

  }

  onMegse() {
    this.clearForm()
    this.felvetel = false
    this.modositas = false
    this.reszletek = false
  }

  onModositas() {
    this.modositas = true
    this.felvetel = false
    this.reszletek = false
  }

  onGysTorol() {

  }

  clearForm() {
    this.azon = ""
    this.desc = ""

  }

  onTeszt(azon: string, leiras: string) {
    console.log(this.gysService.letezikeGys('a'));
    console.log(this.gysService.getGysek());
  }

  onUjGys(azon: string, desc: string) {
    let vanIlyenGys = this.gysService.letezikeGys(azon)
    console.log("ujgys:");
    console.log(azon);


    console.log("vanIlyenGys:");

    console.log(vanIlyenGys);

    if (!vanIlyenGys) {
      this.gysService.ujGys(azon, desc)
      this.validForm = true
    } else {
      this.validForm = false;
    }



  }





}
