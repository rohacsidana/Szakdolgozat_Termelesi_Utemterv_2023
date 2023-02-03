import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gys } from './gys/gys-model';
import { GysService } from './gys/gys.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ln, DataTableService } from '../data-table/data-table.service';
import { LnService } from './ln.service';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css'],
  providers: [DataTableService, LnService]
})
export class LnComponent implements OnInit, OnDestroy {
  modositas = false
  reszletek = false
  torles = false
  validForm = true
  
  sub: Subscription
  
  kereses = ""
  azon: string
  desc: string
  
  /* --------------------------------- */
  newLn = false

  lnHeaders = [
    { name: 'ln_line', szoveg: 'Gyártósor azonosító' },
    { name: 'ln_desc', szoveg: 'Gyártósor leírása' }
  ]

  lines: Ln[]
  getSub: Subscription

  constructor(private lnService: LnService, private dtService: DataTableService) { }

  ngOnInit(): void {
    this.lines = this.lnService.getLines()
    this.dtService.emitDataChanged(this.lines.slice());
    this.getSub = this.lnService.lnChanged.subscribe((data) => {
      this.lines = data.slice();
      this.dtService.dataChanged.next(this.lines.slice());

    });
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe()
  }

  onKereses(k: NgForm) {
    this.kereses = k.value.keresesInput
    console.log(this.kereses);

  }

  onSubmit(form: NgForm) {
    let value = form.value

    console.log(value);

    if (!this.lnService.doesLnExist(value.azonInput)) {
      if (this.newLn) {
        this.onUjGys(form)
      }
      if (this.modositas) {
        this.onModositas(form, value.azonInput, value.descInput)
      }

    } else {
      this.validForm = false
    }
  }

  onModosit() {
    this.modositas = true
    this.newLn = false
    this.reszletek = false
  }

  gysTorol(form: NgForm) {
    /* this.gysService.torolGys(this.gyartosor.ln_id)
    this.clearForm(form) */
  }

  clearForm(form: NgForm) {
    form.resetForm()
    this.azon = ""
    this.desc = ""
    this.newLn = false
    this.modositas = false
    this.reszletek = false
    this.torles = false
    this.validForm = true
  }

  onUjGys(form: NgForm) {
    let value = form.value
    console.log(value);
    let l = value.azonInput
    let d = value.descInput

    this.lnService.newLine({ ln_line: l, ln_desc: d })

    this.clearForm(form)
  }

  onModositas(form: NgForm, azon: string, desc: string) {
    /* let vanE = this.gysService.letezikeGys(azon)

    if (!vanE || (vanE && azon === this.gyartosor.ln_id)) {
      this.gysService.modositGys(this.gyartosor.ln_id, azon, desc)
      this.validForm = true
      this.clearForm(form)
    } else {
      this.validForm = false
    }
  } */

  }


  /*this.sub = this.gysService.kivalasztottGys
        .subscribe(
          (gys: Gys) => {
            this.gyartosor = gys;
            this.azon = gys.ln_id
            this.desc = gys.ln_desc
            this.reszletek = true
            this.felvetel = false
            this.modositas = false
          }
        ) */

}