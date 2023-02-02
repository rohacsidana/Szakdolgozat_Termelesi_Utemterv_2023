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
  torles = false
  validForm = true

  gyartosor: Gys
  sub: Subscription

  kereses = ""
  azon: string
  desc: string

  constructor(private gysService: GysService) { }

  ngOnInit(): void {
    this.sub = this.gysService.kivalasztottGys
      .subscribe(
        (gys: Gys) => {
          this.gyartosor = gys;
          this.azon = gys.ln_id
          this.desc = gys.ln_desc
          this.reszletek = true
          this.felvetel = false
          this.modositas = false
        }
      )
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

  onKereses(k: NgForm) {
    this.kereses = k.value.keresesInput
    console.log(this.kereses);

  }

  onSubmit(form: NgForm) {
    let value = form.value
    console.log("onSubmit:");
    console.log(value);

    if (this.felvetel) {
      this.onUjGys(form)
    }
    if (this.modositas) {
      this.onModositas(form, value.azonInput, value.descInput)
    }
  }

  onModosit() {
    this.modositas = true
    this.felvetel = false
    this.reszletek = false
  }

  onGysTorol(form: NgForm) {
    this.gysService.torolGys(this.gyartosor.ln_id)
    this.clearForm(form)
  }

  clearForm(form: NgForm) {
    form.resetForm()
    this.azon = ""
    this.desc = ""
    this.felvetel = false
    this.modositas = false
    this.reszletek = false
    this.validForm = true
  }

  onUjGys(form: NgForm) {
    let value = form.value
    let vanIlyenGys = this.gysService.letezikeGys(value.azonInput)

    if (!vanIlyenGys) {
      this.gysService.ujGys(value.azonInput, value.descInput)
      this.clearForm(form)

    } else {
      this.validForm = false
    }
  }

  onModositas(form: NgForm, azon: string, desc: string) {
    let vanE = this.gysService.letezikeGys(azon)

    if (!vanE || (vanE && azon === this.gyartosor.ln_id)) {
      this.gysService.modositGys(this.gyartosor.ln_id, azon, desc)
      this.validForm = true
      this.clearForm(form)
    } else {
      this.validForm = false
    }
  }

}
