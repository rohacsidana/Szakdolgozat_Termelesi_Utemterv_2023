import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ak } from './ak/ak-model';
import { AkService } from './ak/ak.service';
import { NgForm } from '@angular/forms';
import { Chg, DataTableService } from '../data-table/data-table.service';
import { ChgService } from './chg.service';

@Component({
  selector: 'app-chg',
  templateUrl: './chg.component.html',
  styleUrls: ['./chg.component.css'],
  providers: [DataTableService, ChgService]
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

  /* ------------------ */

  chgHeaders =  [
    { name: 'chg_line', szoveg: 'Gyártósor azonosító' },
    { name: 'chg_from', szoveg: 'Tételről' },
    { name: 'chg_to', szoveg: 'Tételre' },
    { name: 'chg_time', szoveg: 'Átállási idő' }
  ]
  
  changeTimes: Chg[]
  getSub: Subscription

  constructor(private chgService: ChgService, private dtService: DataTableService) { }


  ngOnInit(): void {
    this.changeTimes = this.chgService.getChangeTimes()
    this.dtService.emitDataChanged(this.changeTimes.slice())
    this.getSub = this.chgService.chgChanged.subscribe((data) => {
      this.changeTimes = data.slice()
      this.dtService.emitDataChanged(this.changeTimes.slice())
    })
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe()
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let value = form.value
    //console.log(this.akService.letezikeAk(value.lineInput, value.fromInput, value.toInput));
    //console.log(this.ujChg);   

    if (!this.chgService.doesChgExist(value.lineInput, value.fromInput, value.toInput)) {
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
    let l = form.value.lineInput
    let f = form.value.fromInput
    let to = form.value.toInput
    let time = form.value.timeInput
    this.chgService.newChg({chg_line: l, chg_from: f, chg_to: to, chg_time: time})

    this.clearForm(form)
  }

  onModositClick() {
    this.szerkesztes = true
    this.ujChg = false
  }

  modositas(form: NgForm) {
    /* this.akService.modositAk(this.ak.chg_line, this.ak.chg_from, this.ak.chg_to,
      this.line, this.from, this.to, this.time)
    this.clearForm(form) */
  }


  gysTorol(form: NgForm) {
    /* this.akService.torolAk(this.ak.chg_line, this.ak.chg_from, this.ak.chg_to)
    this.clearForm(form) */
  }


}


/*onInit:

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

*/