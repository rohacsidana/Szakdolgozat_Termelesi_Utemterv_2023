import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ln, DataTableService } from '../data-table/data-table.service';
import { LnService } from './ln.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-ln',
  templateUrl: './ln.component.html',
  styleUrls: ['./ln.component.css'],
  providers: [DataTableService, DataStorageService],
})
export class LnComponent implements OnInit, OnDestroy {
  line: string = ''
  desc: string = ''

  newLn = false
  edit = false
  details = false
  deleteLn = false
  validForm = true

  lnHeaders = [
    { name: 'ln_line', szoveg: 'Gyártósor azonosító' },
    { name: 'ln_desc', szoveg: 'Gyártósor leírása' }
  ]

  lines: Ln[]
  selectedLine: Ln
  getSub: Subscription
  selectSub: Subscription

  constructor(private lnService: LnService, private dtService: DataTableService,   
    private dsService: DataStorageService) { }

  ngOnInit(): void {
    this.dsService.fetchGyartosorok()

    this.lines = this.lnService.getLines()
    this.dtService.emitDataChanged(this.lines.slice());
    /* A data-table-ben figyeli a változást */
    this.getSub = this.lnService.lnChanged.subscribe((data) => {
      this.lines = data.slice();
      this.dtService.emitDataChanged(this.lines.slice());

    });

    /* Visszaadja a kiválasztott sort kattintásra */
    this.selectSub = this.dtService.selectRow.subscribe((data: Ln) => {
      this.selectedLine = data
      this.onViewLine()
      console.log("kiválasztottad ezt:");
      console.log(this.selectedLine);

    })
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe()
    this.selectSub.unsubscribe()
  }

  onSubmit(form: NgForm) {
    let value = form.value
    //console.log(value);
  
    if (this.deleteLn) {
      this.onDeleteLine(form)
    }
    if (this.newLn) {
      this.onNewLn(form)
    }
    if (this.edit) {
      this.onEditLine(form)
    }

  }

  onViewLine() {
    this.details = true
    this.newLn = false
    this.edit = false

    this.line = this.selectedLine.ln_line
    this.desc = this.selectedLine.ln_desc

  }

  onModositasa() {
    this.edit = true
    this.newLn = false
    this.details = false
    this.deleteLn = false
  }

  onEditLine(form: NgForm) {
    let value = form.value
    let lnExists = this.lnService.doesLnExist(value.azonInput)
    let l = value.azonInput
    let d = value.descInput

    if (!lnExists || (lnExists && value.azonInput === this.selectedLine.ln_line)) {
      //this.lnService.editLine(this.selectedLine.ln_line, { ln_line: l, ln_desc: d })
      this.dsService.updateLn({ln_line: this.selectedLine.ln_line, ln_desc: d})
      this.clearForm(form)
    } else {
      this.validForm = false
    }

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
    this.line = ""
    this.desc = ""
    this.newLn = false
    this.edit = false
    this.details = false
    this.deleteLn = false
    this.validForm = true
    form.resetForm()
  }

  onNewLn(form: NgForm) {
    let value = form.value
    let lnExists = this.lnService.doesLnExist(value.azonInput)
    let l = value.azonInput
    let d = value.descInput

    if (!lnExists) {
      let newLn = { ln_line: l, ln_desc: d }
      //console.log(newLn);
      
      //this.lnService.newLine(newLn)  
      this.dsService.newLn(newLn)
      this.clearForm(form)
    } else {
      this.validForm = false
    }

  }
}