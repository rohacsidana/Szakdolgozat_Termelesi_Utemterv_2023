import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SkService } from './sk/sk.service';
import { Sk } from './sk/sk-model';
import { DataTableService } from '../data-table/data-table.service';

@Component({
  selector: 'app-lnd',
  templateUrl: './lnd.component.html',
  styleUrls: ['./lnd.component.css'],


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

  constructor(private skService: SkService, private dtService: DataTableService) { }


  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    
  }




  onSubmit(form: NgForm) {
    console.log(form.value);
    let value = form.value

    if (!this.skService.letezikeSk(value.lineInput, value.partInput)) {
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
    form.resetForm()
    this.ujLnd = false
    this.szerkesztes = false
    this.torles = false
    this.validForm = true
    this.line = ''
    this.part = null
    this.rate = null
  }

  onUjLnd(form: NgForm) {
    this.ujLnd = true
    let l = form.value.lineInput
    let p = form.value.partInput
    let r = form.value.rateInput
    this.skService.ujSk(l, p, r)
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
*/