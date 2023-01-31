import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SkService } from './sk/sk.service';
import { Sk } from './sk/sk-model';

@Component({
  selector: 'app-lnd',
  templateUrl: './lnd.component.html',
  styleUrls: ['./lnd.component.css'],


})
export class LndComponent implements OnInit, OnDestroy {
  ujLnd = false
  sk: Sk
  skSub: Subscription

  line: string
  part: number
  rate: number

  szerkesztes = false

  constructor(private skService: SkService) { }

  ngOnInit(): void {
    this.skSub = this.skService.kivalasztottSk
      .subscribe(
        (sk: Sk) => {
          console.log(sk);
          this.sk = sk
          this.line = sk.lnd_line
          this.part = sk.lnd_part
          this.rate = sk.lnd_rate
          this.onModosit()
        }
      )
  }

  ngOnDestroy(): void {
    this.skSub.unsubscribe()
  }


  clearForm() {
    this.line = ''
    this.part = null
    this.rate = null
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let value = form.value
    if (this.ujLnd) {
      let l = value.lineInput
      let p = value.partInput
      let r = value.rateInput
      this.onUjLnd(l, p, r)
    }


  }

  onMegse() {
    this.ujLnd = false
    this.szerkesztes = false
    this.clearForm()
  }

  onUjLnd(line: string, part: number, rate: number) {
    this.ujLnd = true
    this.skService.ujGys(line, part, rate)

  }

  onModosit() {
    this.szerkesztes = true
    this.ujLnd = false
  }

  onTorol() {
    this.skService.torolSk(this.sk.lnd_line)
    this.onMegse()
  }


}
