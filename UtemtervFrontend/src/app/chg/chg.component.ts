import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Chg, DataTableService } from '../data-table/data-table.service';
import { ChgService } from './chg.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-chg',
  templateUrl: './chg.component.html',
  styleUrls: ['./chg.component.css'],
  providers: [DataTableService, DataStorageService]
})
export class ChgComponent {
  newChg = false
  edit = false
  deleteChg = false
  validForm = true

  line: string
  from: number
  to: number
  time: string

  chgHeaders = [
    { name: 'chg_line', szoveg: 'Gyártósor azonosító' },
    { name: 'chg_from', szoveg: 'Tételről' },
    { name: 'chg_to', szoveg: 'Tételre' },
    { name: 'chg_time', szoveg: 'Átállási idő' }
  ]

  changeTimes: Chg[]
  selectedChg: Chg
  getSub: Subscription
  selectSub: Subscription

  constructor(private chgService: ChgService, private dtService: DataTableService,
    private dsService: DataStorageService) { }


  ngOnInit(): void {
    this.dsService.fetchChgs()

    this.changeTimes = this.chgService.getChangeTimes()
    this.dtService.emitDataChanged(this.changeTimes.slice())
    /* A data-table-ben figyeli a változást */
    this.getSub = this.chgService.chgChanged.subscribe((data) => {
      this.changeTimes = data.slice()
      this.dtService.emitDataChanged(this.changeTimes.slice())
    })

    /* Visszaadja a kiválasztott sort kattintásra */
    this.selectSub = this.dtService.selectRow.subscribe((data: Chg) => {
      this.selectedChg = data
      this.editStarted()
      console.log("kiválasztottad ezt:");
      console.log(this.selectedChg);

    })
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe()
    this.selectSub.unsubscribe()
  }

  onSubmit(form: NgForm) {
    let value = form.value
    console.log(value);

    if (this.newChg) {
      this.onNewChg(form)
    }
    if (this.edit) {
      this.onEditChg(form)
    }
    if (this.deleteChg) {
      this.onDeleteChg(form)
    }

  }

  editStarted() {
    this.edit = true
    this.newChg = false

    this.line = this.selectedChg.chg_line
    this.from = this.selectedChg.chg_from
    this.to = this.selectedChg.chg_to
    this.time = this.selectedChg.chg_time

  }

  clearForm(form: NgForm) {
    form.resetForm()
    this.newChg = false
    this.edit = false
    this.deleteChg = false
    this.validForm = true
    this.line = ''
    this.from = null
    this.to = null
    this.time = ''
  }

  onNewChg(form: NgForm) {
    let value = form.value
    let l = value.lineInput
    let f = value.fromInput
    let to = value.toInput
    let time = value.timeInput

    if (!this.chgService.doesChgExist(l, f, to)) {
      this.chgService.newChg({ chg_line: l, chg_from: f, chg_to: to, chg_time: time })
      this.clearForm(form)

    } else {
      this.validForm = false
    }

  }

  onModositClick() {
    this.edit = true
    this.newChg = false
  }

  onEditChg(form: NgForm) {
    let value = form.value
    let l = value.lineInput
    let f = value.fromInput
    let to = value.toInput
    let time = value.timeInput

    if (!this.chgService.doesChgExist(l, f, to)) {
      this.chgService.editChg(this.selectedChg.chg_line, this.selectedChg.chg_from, this.selectedChg.chg_to,
        { chg_line: l, chg_from: f, chg_to: to, chg_time: time })
      this.clearForm(form)
    } else {
      this.validForm = false
    }
  }


  onDeleteChg(form: NgForm) {
    this.chgService.deleteChg(this.selectedChg.chg_line, this.selectedChg.chg_from, this.selectedChg.chg_to)
    this.clearForm(form)
  }


}
