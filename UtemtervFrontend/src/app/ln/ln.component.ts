import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gys } from './gys/gys-model';
import { GysService } from './gys/gys.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ln, DataTableService } from '../data-table/data-table.service';
import { LnService } from './ln.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css'],
  providers: [DataTableService, LnService],
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
  selectedLine: Ln
  getSub: Subscription
  selectSub: Subscription

  constructor(private lnService: LnService, private dtService: DataTableService) { }

  ngOnInit(): void {
    this.lines = this.lnService.getLines()
    this.dtService.emitDataChanged(this.lines.slice());
    this.getSub = this.lnService.lnChanged.subscribe((data) => {
      this.lines = data.slice();
      this.dtService.emitDataChanged(this.lines.slice());

    });

    this.selectSub = this.dtService.selectRow.subscribe((data: Ln) => {
      this.selectedLine = data
      this.onViewLine()
      console.log("kiválasztottad ezt:");
      console.log(this.selectedLine);

    })
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe()
  }

  onSubmit(form: NgForm) {
    let value = form.value

    console.log(value);

    if (this.torles) {
      this.onDeleteLine(form)
    } else {
      //!vanE || (vanE && azon === this.gyartosor.ln_id)
      let lnExists = this.lnService.doesLnExist(value.azonInput)
      if (!lnExists && this.newLn) {
        this.onUjGys(form)
      }
      if (this.modositas) {
        if (!lnExists || (lnExists && value.azonInput === this.selectedLine.ln_line)) {
          this.onEditLine(form)
        }
      }
    }


  }

  onViewLine() {
    this.reszletek = true
    this.modositas = false
    this.newLn = false

    this.azon = this.selectedLine.ln_line
    this.desc = this.selectedLine.ln_desc

  }

  onModositasa() {
    this.modositas = true
    this.newLn = false
    this.reszletek = false
    this.torles = false
  }

  onEditLine(form: NgForm) {
    let value = form.value
    let l = value.azonInput
    let d = value.descInput
    this.lnService.editLine(this.selectedLine.ln_line, { ln_line: l, ln_desc: d })
    this.clearForm(form)
  }

  onDeleteLine(form: NgForm) {
    this.lnService.deleteLine(this.selectedLine.ln_line)
    console.log(this.selectedLine.ln_line);
    this.clearForm(form)
    console.log("lines:");
    console.log(this.lines);
    console.log("getLines:");
    console.log(this.lnService.getLines());




  }

  clearForm(form: NgForm) {
    this.azon = ""
    this.desc = ""
    this.newLn = false
    this.modositas = false
    this.reszletek = false
    this.torles = false
    this.validForm = true
    form.resetForm()
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