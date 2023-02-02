import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ak } from './ak/ak-model';
import { AkService } from './ak/ak.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chg',
  templateUrl: './chg.component.html',
  styleUrls: ['./chg.component.css']
})
export class ChgComponent {
  ujChg = false
  szerkesztes = false
  torles = false
  validForm = true
  ak: Ak
  akSub: Subscription

  line: string
  from: number
  to: number
  time: string


  constructor(private akService: AkService) { }


  ngOnInit(): void {
    this.akSub = this.akService.kivalasztottAk
      .subscribe(
        (ak: Ak) => {
          console.log(ak);
          this.ak = ak
          this.line = ak.chg_line
          this.from = ak.chg_from
          this.to = ak.chg_to
          this.time = ak.chg_time
          this.onModositClick()
        }
      )
  }

  ngOnDestroy(): void {
    this.akSub.unsubscribe()
  }




  onSubmit(form: NgForm) {
    console.log(form.value);
    let value = form.value
    //console.log(this.akService.letezikeAk(value.lineInput, value.fromInput, value.toInput));
    //console.log(this.ujChg);   

    if (!this.akService.letezikeAk(value.lineInput, value.fromInput, value.toInput)) {
      if (this.ujChg) {
        this.onUjChg(form)
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
    this.ujChg = false
    this.szerkesztes = false
    this.torles = false
    this.validForm = true
    this.line = ''
    this.from = null
    this.to = null
    this.time = ''
  }

  onUjChg(form: NgForm) {
    this.ujChg = true
    let l = form.value.lineInput
    let f = form.value.fromInput
    let to = form.value.toInput
    let time = form.value.timeInput
    this.akService.ujAk(l, f, to, time)
    console.log(this.akService.getOsszAk());

    this.clearForm(form)
  }

  onModositClick() {
    this.szerkesztes = true
    this.ujChg = false
  }

  modositas(form: NgForm) {
    this.akService.modositAk(this.ak.chg_line, this.ak.chg_from, this.ak.chg_to,
      this.line, this.from, this.to, this.time)
    this.clearForm(form)
  }


  gysTorol(form: NgForm) {
    this.akService.torolAk(this.ak.chg_line, this.ak.chg_from, this.ak.chg_to)
    this.clearForm(form)
  }


}
