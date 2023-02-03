import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SkService } from './sk/sk.service';
import { Sk } from './sk/sk-model';
import { DataTableService, Lnd } from '../data-table/data-table.service';
import { LndService } from './lnd.service';

@Component({
  selector: 'app-lnd',
  templateUrl: './lnd.component.html',
  styleUrls: ['./lnd.component.css'],
  providers: [DataTableService, LndService]


})
export class LndComponent implements OnInit, OnDestroy {
  ujLnd = false
  szerkesztes = false
  validForm = true
  torles = false
  sk: Sk
  skSub: Subscription

  line: string
  part: number
  rate: number

  /* -----------data-table----------- */

  lndHeaders = [
    { name: 'lnd_line', szoveg: 'Gyártósor azonosító' },
    { name: 'lnd_part', szoveg: 'Tétel' },
    { name: 'lnd_rate', szoveg: 'Mennyiség/óra' },
  ]

  getSub: Subscription
  rates: Lnd[]

  constructor(private skService: SkService, private dtService: DataTableService, private lndService: LndService) { }


  ngOnInit(): void {
    this.rates = this.lndService.getRates()
    this.dtService.emitDataChanged(this.rates.slice())
    this.getSub = this.lndService.lndChanged.subscribe((data) => {
      this.rates = data.slice()
      this.dtService.emitDataChanged(this.rates.slice())
    })

  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe()
  }

/* --------------------------------- */


  onSubmit(form: NgForm) {
    let value = form.value
    console.log(value);

    if (!this.lndService.doesLndExist(value.lineInput, value.partInput)) {
      if (this.ujLnd) {
        this.onUjLnd(form)
      }
      if (this.szerkesztes) {
        this.modositas(form)
      }
    } else {
      this.validForm = false
    }
  }

  clearForm(form: NgForm) {
    this.ujLnd = false
    this.szerkesztes = false
    this.torles = false
    this.validForm = true
    this.line = ''
    this.part = null
    this.rate = null
    form.resetForm()
  }

  onUjLnd(form: NgForm) {
    let l = form.value.lineInput
    let p = form.value.partInput
    let r = form.value.rateInput

    this.lndService.newRate({lnd_line: l, lnd_part: p, lnd_rate: r})
    console.log(this.lndService.getRates());
    
    this.clearForm(form)
  }

  onModositClick() {
    this.szerkesztes = true
    this.ujLnd = false
  }

  modositas(form: NgForm) {
    this.skService.modositSk(this.sk.lnd_line, this.sk.lnd_part, this.line, this.part, this.rate)
    this.clearForm(form)
  }


  gysTorol(form: NgForm) {
    this.skService.torolSk(this.sk.lnd_line, this.sk.lnd_part)
    this.clearForm(form)
  }


}


/* ngOnInit:

this.skSub = this.skService.kivalasztottSk
      .subscribe(
        (sk: Sk) => {
          //console.log(sk);
          this.sk = sk
          this.line = sk.lnd_line
          this.part = sk.lnd_part
          this.rate = sk.lnd_rate
          this.onModositClick()
          console.log(this.skService.getSk(this.line, this.part));
          
        }
      )


ngOnDestroy:

this.skSub.unsubscribe()

onUjLnd:

this.ujLnd = true
    let l = form.value.lineInput
    let p = form.value.partInput
    let r = form.value.rateInput
    this.skService.ujSk(l, p, r)
*/